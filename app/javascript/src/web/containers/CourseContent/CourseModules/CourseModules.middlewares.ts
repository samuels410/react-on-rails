import { takeLatest, put, call, cancelled, all } from 'redux-saga/effects'
import * as types from './CourseModules.types'
import {
  fetchCourseModulesFailure,
  fetchCourseModulesSuccess,
  fetchCourseModules,
} from './CourseModules.actions'
import { cancelable, stringify } from '../../../../common/utils'
import {
  courseModuleItemsBulkInsert,
  BulkModuleItemsInsertParams,
  fetchCourseModuleItems,
} from '../CourseModule/CourseModule.actions'
import { ModuleID } from '../../../../common/types'

export async function getCourseModulesAPI(
  action: ReturnType<typeof fetchCourseModules>,
  signal: AbortSignal
) {
  const params = stringify({
    access_token: process.env.REACT_APP_API_ACCESS_TOKEN,
    include: ['items', 'content_details'],
    ...action.payload,
  })

  const { courseId } = action.meta
  const response = await fetch(
    `${
      process.env.REACT_APP_API_URL_1
    }v1/courses/${courseId}/modules?${params}`,
    { signal }
  )
  if (response.ok) {
    const responseBody = await response.json()
    return responseBody
  }
  throw new Error(response.statusText)
}

function* getCourseModulesHandler(
  action: ReturnType<typeof fetchCourseModules>
) {
  const abortController = new AbortController()
  try {
    const data: any[] = yield call(
      getCourseModulesAPI,
      action,
      abortController.signal
    )

    /** Accumulate all module Items grouped by module */
    const moduleItems: BulkModuleItemsInsertParams = data.reduce(
      (accumulator: BulkModuleItemsInsertParams, moduleData: any) => {
        accumulator[moduleData.id] = {
          items: moduleData.items || {},
          count: moduleData.items_count || 0,
        }
        return accumulator
      },
      {}
    )

    /** Delete all module items from moduleData  */
    data.forEach((d, i) => {
      delete data[i].items
    })

    /** Push Module data in Redux state */
    yield put(fetchCourseModulesSuccess(data, action.meta))

    /** Push Module items data in Redux state */
    yield put(courseModuleItemsBulkInsert(moduleItems))

    /** Aggregate all modules whose module items are not available */
    const moduleItemsMissingList: ModuleID[] = Object.entries(moduleItems)
      .filter(
        ([moduleId, moduleObj]) =>
          (moduleObj.count > 0 && !('items' in moduleObj)) ||
          moduleObj.items.length === 0
      )
      .map(([moduleId]) => moduleId)

    /** Trigger data fetch for modules which have a module items count(>0) but missing in response  */
    yield all(
      moduleItemsMissingList.map(moduleId =>
        put(
          fetchCourseModuleItems(
            { courseId: action.meta.courseId, moduleId },
            { courseId: action.meta.courseId, moduleId }
          )
        )
      )
    )
  } catch (e) {
    yield put(fetchCourseModulesFailure(e, action.meta))
  } finally {
    if (cancelled()) {
      abortController.abort()
    }
  }
}

export function* getCourseModulesMiddleware() {
  yield takeLatest(
    types.COURSE_MODULES_FETCH,
    cancelable(getCourseModulesHandler, types.COURSE_MODULES_FETCH_CANCEL)
  )
}

export default ([] as any).concat(getCourseModulesMiddleware())
