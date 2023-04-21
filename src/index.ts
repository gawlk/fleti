export function fleti<In, Out = In[]>(array: In[]) {
  const computations: Computations = []

  const fleti: Fleti<In, Out> = {
    compute() {
      const computationsLength = computations.length

      if (!computationsLength) return array as Out

      const temp: any[] = []

      const lastKind = computations.at(-1)?.kind as NonNullable<Kind>
      const lastCallback = computations.at(-1)?.callback as NonNullable<any>

      const isLastFilter = lastKind === Kind.Filter
      const isLastForEach = lastKind === Kind.ForEach

      const maxI = array.length
      const maxJ = computationsLength - 1

      const lastFunction = isLastFilter
        ? (lastReturn: any, toPush: any) => lastReturn && temp.push(toPush)
        : (lastReturn: any) => temp.push(lastReturn)

      loopI: for (let i = 0; i < maxI; i++) {
        let value = array[i]

        for (let j = 0; j < maxJ; j++) {
          const { kind, callback } = computations[j]

          if (!kind) {
            if (!callback(value, i, array, temp)) continue loopI
          } else {
            // Is map
            // @ts-ignore
            value = callback(value, i, temp)
          }
        }

        lastFunction(lastCallback(value, i, temp), value)
      }

      return (!isLastForEach ? temp : undefined) as Out
    },
    map(callback) {
      computations.push({
        kind: Kind.Map,
        // @ts-ignore
        callback,
      })

      return this as unknown as Fleti<In, ReturnType<typeof callback>[]>
    },
    filter(callback) {
      computations.push({
        kind: Kind.Filter,
        callback,
      })

      return this
    },
    reduce(callback) {
      computations.push({
        kind: Kind.Reduce,
        // @ts-ignore
        callback,
      })

      return this as any
    },
    forEach(callback) {
      computations.push({
        kind: Kind.ForEach,
        callback,
      })

      return {
        compute: this.compute,
      } as FletiBase<undefined>
    },
  }

  return fleti
}

type Fleti<In, Out = In[]> = FletiBase<Out> & FletiComputers<In, Out>

interface FletiComputers<In, Out = In[]> {
  map: <New>(
    callback: (value: In, index: number, array: In[], computed: New[]) => New
  ) => Fleti<In, New[]>

  filter: (
    callback: (value: In, index: number, array: In[], computed: In[]) => boolean
  ) => Fleti<In, Out>

  reduce: <New = In>(
    callback: (
      accumulator: New,
      currentValue: In,
      currentIndex: number,
      array: In[]
    ) => New,
    initialValue?: New
  ) => New extends unknown[]
    ? Fleti<In, ReturnType<typeof callback>>
    : FletiBase<ReturnType<typeof callback>>

  forEach: (
    callback: (value: In, index: number, array: In[]) => void
  ) => FletiBase<undefined>
}

interface FletiBase<Out> {
  compute: () => Out
}

enum Kind {
  Filter,
  Map,
  Reduce,
  ForEach,
}

type F = FletiComputers<any>
type C<T extends (...args: any) => any> = Parameters<T>[0]

type Computations = (
  | {
      kind: Kind.Map
      callback: C<F['map']>
    }
  | {
      kind: Kind.Filter
      callback: C<F['filter']>
    }
  | {
      kind: Kind.Reduce
      callback: C<F['reduce']>
    }
  | {
      kind: Kind.ForEach
      callback: C<F['forEach']>
    }
)[]
