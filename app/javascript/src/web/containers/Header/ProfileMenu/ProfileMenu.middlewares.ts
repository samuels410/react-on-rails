import { takeLatest, put, call, cancelled } from 'redux-saga/effects'
import { USER_DETAILS_FETCH } from './ProfileMenu.types'
import {
  fetchUserDetailsFailure,
  fetchUserDetailsSuccess,
} from './ProfileMenu.actions'

const apiCall = async (signal: AbortSignal) => {
  const response = await fetch(
    `${
      process.env.REACT_APP_API_URL_1
    }v1/users/32530/profile?access_token=dPjx9Mv1WF2fqZoanyJCLxdpHu4KHzNv1EycnjzG5b2jgibYQPYPJhd5YqYZHpyQ`,
    { signal }
  )
  if (response.status === 200) {
    const responseBody = await response.json()
    return responseBody
  }
  throw response
}

function* getUserDetails() {
  const abortController = new AbortController()
  try {
    const data = yield call(apiCall, abortController.signal)
    yield put(fetchUserDetailsSuccess(data))
  } catch (e) {
    yield put(fetchUserDetailsFailure(e))
  } finally {
    if (cancelled()) {
      abortController.abort()
    }
  }
}

function* getUserDetailsMiddleware() {
  yield takeLatest(USER_DETAILS_FETCH, getUserDetails)
}

export default ([] as any).concat(getUserDetailsMiddleware())
