import { readFileSync, readdirSync, writeFileSync } from 'fs'

export default () => {
  const folder = './tests/benchmark/results'

  const allResults = readdirSync(folder).map((file) => {
    return JSON.parse(
      readFileSync(`${folder}/${file}`, undefined).toString('utf-8')
    ) as Benchmark
  })

  const [first] = allResults

  if (!first) return

  const details = Object.entries(first.results)
    .map(([groupName, tests]) => {
      const title = `### ${groupName}\n\n`

      const body = Object.entries(tests)
        .map(([testName, functions]) => {
          const title = `#### ${testName}\n\n`

          const body = Object.entries(functions)
            .map(([functionName, results]) => {
              const title = `##### ${functionName}\n\n`

              const header =
                '|    |' +
                allResults.map((bench) => ` ${bench.browser.name} |`).join('')

              const separator =
                '| :---: |' +
                new Array(allResults.length)
                  .fill(0)
                  .map(() => ` --- |`)
                  .join('')

              const body = results
                .map((_, index) => {
                  return (
                    `| ${index + 1} |` +
                    allResults
                      .map((resultsByBrowser) => {
                        const value =
                          resultsByBrowser.results[groupName][testName][
                            functionName as any as FunctionName
                          ][index]

                        return ` ${Math.round(value)} |`
                      })
                      .join('')
                  )
                })
                .join('\n')

              const summary =
                '| Average |' +
                allResults
                  .map((resultsByBrowser) => {
                    const value = average(
                      resultsByBrowser.results[groupName][testName][
                        functionName as any as FunctionName
                      ]
                    )

                    return ` ${Math.round(value)} |`
                  })
                  .join('')

              const table = [header, separator, body, summary].join('\n')

              return title + table + '\n'
            })
            .join('\n')

          return title + body + '\n'
        })
        .join('\n')

      return title + body + '\n'
    })
    .join('\n')

  const readme = `
# Introduction

This repository had two goals:

- Check the speed difference in all major browsers of ]\`for let i\`, \`for ... of\`, \`filter/forEach/map/reduce\` using \`playwright\`
- Check if it would be faster to use the same system of callbacks from \`filter/forEach/map/reduce/\` but while using a wrapper around \`for let i\`
  
# Benchmark

Dataset: \`[Math.random() * 100; 10_000_000]\`

Tries: \`10\`

To avoid as much engine optimization as possible a new dataset is created before each function run (aka try).

All values that you'll find below are in \`milliseconds\`

## Summary

--

## Details

${details}
`
  writeFileSync('./README.md', readme)
}

const average = (values: number[]) =>
  values.reduce((total, currentValue) => total + currentValue, 0) /
  values.length
