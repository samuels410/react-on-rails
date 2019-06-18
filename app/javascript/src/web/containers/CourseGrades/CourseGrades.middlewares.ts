import { takeLatest, put, call, cancelled } from 'redux-saga/effects'
import {
  COURSE_GRADES_FETCH,
  COURSE_GRADES_FETCH_CANCEL,
} from './CourseGrades.types'
import { cancelable, stringify } from '../../../common/utils'
import {
  fetchCourseGradesFailure,
  fetchCourseGradesSuccess,
  fetchCourseGrades,
} from './CourseGrades.actions'

export async function getCourseGradesAPI(
  action: ReturnType<typeof fetchCourseGrades>,
  signal: AbortSignal
) {
  const params = stringify({
    access_token: process.env.REACT_APP_API_ACCESS_TOKEN,
  })

  const { courseId } = action.meta
  const response = await fetch(
    `${
      process.env.REACT_APP_API_URL_1
    }v1/users/32530/courses/${courseId}/assignments?${params}`,
    { signal }
  )
  const responseBody = await response.json()
  return responseBody
}

function* getCourseGradesHandler(action: ReturnType<typeof fetchCourseGrades>) {
  const abortController = new AbortController()
  try {
    const data = yield call(getCourseGradesAPI, action, abortController.signal)
    yield put(fetchCourseGradesSuccess(data, action.meta))
  } catch (e) {
    yield put(fetchCourseGradesFailure(e, action.meta))
  } finally {
    if (cancelled()) {
      abortController.abort()
    }
  }
}

export function* getCourseGradesMiddleware() {
  yield takeLatest(
    COURSE_GRADES_FETCH,
    cancelable(getCourseGradesHandler, COURSE_GRADES_FETCH_CANCEL)
  )
}

export default ([] as any).concat(getCourseGradesMiddleware())
