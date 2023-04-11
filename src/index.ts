export function fleti<T, K = T[]>(array: T[]) {
  enum Kind {
    Filter,
    Map,
    Reduce,
    ForEach,
  }

  type FType<K extends Exclude<keyof ReturnType<typeof fleti>, 'compute'>> =
    Parameters<ReturnType<typeof fleti>[K]>[0]
  type FastMap = FType<'map'>
  type FastFilter = FType<'filter'>
  type FastReduce = FType<'reduce'>
  type FastForEach = FType<'forEach'>

  const computations: (
    | {
        kind: Kind.Map
        callback: FastMap
      }
    | {
        kind: Kind.Filter
        callback: FastFilter
      }
    | {
        kind: Kind.Reduce
        callback: FastReduce
      }
    | {
        kind: Kind.ForEach
        callback: FastForEach
      }
  )[] = []

  return {
    map<U>(callback: (value: T, index: number, computed: U[]) => U) {
      computations.push({
        kind: Kind.Map,
        callback: callback as FastMap,
      })

      return this
    },
    filter(callback: (value: T, index: number, computed: T[]) => boolean) {
      computations.push({
        kind: Kind.Filter,
        callback: callback as FastFilter,
      })

      return this
    },
    reduce(callback: <U>(value?: T, index?: number, array?: T[]) => U) {
      computations.push({
        kind: Kind.Reduce,
        callback: callback as FastReduce,
      })

      return this
    },
    forEach(callback: (value?: T, index?: number) => void) {
      computations.push({
        kind: Kind.ForEach,
        callback: callback as FastForEach,
      })

      return {
        compute: this.compute,
      }
    },
    compute(): K {
      const computationsLength = computations.length

      if (!computationsLength) return array as K

      const kinds = computations.map((c) => c.kind)
      const callbacks = computations.map((c) => c.callback)

      const temp: any[] = []

      const lastKind = kinds.at(-1) as NonNullable<Kind>
      const lastCallback = callbacks.at(-1) as NonNullable<any>

      const isLastMap = lastKind === Kind.Map
      const isLastFilter = lastKind === Kind.Filter
      const isLastForEach = lastKind === Kind.ForEach

      const maxI = array.length
      const maxJ = computationsLength - 1

      const lastFunction = isLastFilter
        ? (lastReturn: any, value: any) => lastReturn && temp.push(value)
        : (lastReturn: any) => temp.push(lastReturn)

      loopI: for (let i = 0; i < maxI; i++) {
        let value = array[i]

        for (let j = 0; j < maxJ; j++) {
          const { kind, callback } = computations[j]

          if (!kind) {
            if (!callback(value, i, temp)) continue loopI
          } else {
            // Is map
            value = callback(value, i, temp)
          }
        }

        lastFunction(lastCallback(value, i, temp), value)
      }

      if (!isLastForEach) {
        return temp as K
      } else {
        // @ts-ignore
        return undefined
      }
    },
  }
}
