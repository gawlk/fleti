import { testsForEach } from './foreach'
import { testsFilter } from './filter'
import { testsFilterMap } from './filter_map'
import { testsMap } from './map'
import { testsMapFilterMap } from './map_filter_map'

export const testsToRun = [
  testsFilter,
  testsMap,
  testsForEach,
  testsFilterMap,
  testsMapFilterMap,
]
