import {
  USER_DETAILS_FETCH,
  USER_DETAILS_FETCH_SUCCESS,
  USER_DETAILS_FETCH_FAILURE,
  USER_DETAILS_FETCH_CANCEL,
} from './ProfileMenu.types'

export const fetchUserDetails = () => ({
  type: USER_DETAILS_FETCH as typeof USER_DETAILS_FETCH,
})

export const fetchUserDetailsSuccess = (payload: any) => ({
  type: USER_DETAILS_FETCH_SUCCESS as typeof USER_DETAILS_FETCH_SUCCESS,
  payload,
})

export const fetchUserDetailsFailure = (payload: any) => ({
  type: USER_DETAILS_FETCH_FAILURE as typeof USER_DETAILS_FETCH_FAILURE,
  payload,
})

export const fetchUserDetailsCancel = (payload: Error) => ({
  type: USER_DETAILS_FETCH_CANCEL as typeof USER_DETAILS_FETCH_CANCEL,
  payload,
})

export type UserDetailsActions =
  | ReturnType<typeof fetchUserDetails>
  | ReturnType<typeof fetchUserDetailsSuccess>
  | ReturnType<typeof fetchUserDetailsFailure>
  | ReturnType<typeof fetchUserDetailsCancel>
