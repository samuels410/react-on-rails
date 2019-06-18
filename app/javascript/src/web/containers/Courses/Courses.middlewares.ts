import { takeLatest, put, call, cancelled } from 'redux-saga/effects'
import {
  COURSE_LIST_FETCH,
  COURSE_LIST_FETCH_CANCEL,
  COURSE_DETAILS_FETCH,
} from './Courses.types'
import {
  fetchCourseListFailure,
  fetchCourseListSuccess,
  fetchCourseDetailsSuccess,
  fetchCourseDetailsFailure,
  CourseDetailsFetchParams,
  fetchCourseDetails,
  fetchCourseList,
} from './Courses.actions'
import { cancelable, stringify } from '../../../common/utils'

export async function getCourseListApi(signal: AbortSignal) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}v1/users/32530/dashboard?access_token=${
      process.env.REACT_APP_API_ACCESS_TOKEN
    }`,
    { signal }
  )
  const responseBody = await response.json()
  return responseBody
}

function* getCourseList({ meta }: ReturnType<typeof fetchCourseList>) {
  const abortController = new AbortController()
  try {
    const data = yield call(getCourseListApi, abortController.signal)
    yield put(fetchCourseListSuccess(data, meta))
  } catch (e) {
    yield put(fetchCourseListFailure(e, meta))
  } finally {
    if (cancelled()) {
      abortController.abort()
    }
  }
}

export function* getCourseListMiddleware() {
  yield takeLatest(
    COURSE_LIST_FETCH,
    cancelable(getCourseList, COURSE_LIST_FETCH_CANCEL)
  )
}

// --------------------------------------------------------------//

export async function getCourseDetailsApi(
  { courseId, include = [] }: CourseDetailsFetchParams,
  signal: AbortSignal
) {
  const params = stringify({
    access_token: process.env.REACT_APP_API_ACCESS_TOKEN,
    include,
  })
  const response = await fetch(
    `${process.env.REACT_APP_API_URL_1}v1/courses/${courseId}?${params}`,
    { signal }
  )
  const responseBody = await response.json()
  return responseBody
}

function* getCourseDetails({
  payload,
  meta,
}: ReturnType<typeof fetchCourseDetails>) {
  const abortController = new AbortController()
  try {
    const data = yield call(
      getCourseDetailsApi,
      payload,
      abortController.signal
    )
    yield put(fetchCourseDetailsSuccess(data, meta))
  } catch (e) {
    yield put(fetchCourseDetailsFailure(e, meta))
  } finally {
    if (cancelled()) {
      abortController.abort()
    }
  }
}

export function* getCourseDetailsMiddleware() {
  yield takeLatest(
    COURSE_DETAILS_FETCH,
    cancelable(getCourseDetails, COURSE_DETAILS_FETCH)
  )
}

export default ([] as any).concat(
  getCourseListMiddleware(),
  getCourseDetailsMiddleware()
)
