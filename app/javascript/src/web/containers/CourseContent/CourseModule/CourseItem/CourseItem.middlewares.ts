import { takeEvery, put, call, cancelled } from 'redux-saga/effects'
import { stringify } from 'query-string'
import {
  COURSE_ITEM_CONTENT_FETCH,
  COURSE_ITEM_CONTENT_FETCH_CANCEL,
} from './CourseItem.types'
import { cancelable } from '../../../../../common/utils'
import {
  fetchCourseItemContent,
  fetchCourseItemContentSuccess,
  fetchCourseItemContentFailure,
} from './CourseItem.actions'

export async function getCourseItemContentAPI(
  action: ReturnType<typeof fetchCourseItemContent>,
  signal: AbortSignal
) {
  const { url, ...queryParams } = action.payload
  const params = stringify({
    access_token: process.env.REACT_APP_API_ACCESS_TOKEN,
    ...queryParams,
  })
  const response = await fetch(`${url}?${params}`, { signal })
  if (response.ok) {
    const responseBody = await response.json()
    return responseBody
  }
  throw new Error('Unable to fetch course item details')
}

function* getCourseItemContentHandler(
  action: ReturnType<typeof fetchCourseItemContent>
) {
  const abortController = new AbortController()
  try {
    const data = yield call(
      getCourseItemContentAPI,
      action,
      abortController.signal
    )
    yield put(fetchCourseItemContentSuccess(data, action.meta))
  } catch (e) {
    yield put(fetchCourseItemContentFailure(e, action.meta))
  } finally {
    if (cancelled()) {
      abortController.abort()
    }
  }
}

export function* getCourseItemContentMiddleware() {
  yield takeEvery(
    COURSE_ITEM_CONTENT_FETCH,
    cancelable(getCourseItemContentHandler, COURSE_ITEM_CONTENT_FETCH_CANCEL)
  )
}

export default ([] as any).concat(getCourseItemContentMiddleware())
