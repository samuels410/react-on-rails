import { Reducer, combineReducers } from 'redux'
import { UserDetailsActions } from './ProfileMenu.actions'
import {
  USER_DETAILS_FETCH,
  USER_DETAILS_FETCH_SUCCESS,
  USER_DETAILS_FETCH_FAILURE,
  USER_DETAILS_FETCH_CANCEL,
} from './ProfileMenu.types'
import { UserDetailsData } from '../../../components/Header'

interface UserDetailsState {
  data: null | UserDetailsData | Error
  loading: boolean
  error: boolean
}

const intialState: UserDetailsState = {
  data: null,
  loading: false,
  error: false,
}

const UserDetailsReducer: Reducer<UserDetailsState, UserDetailsActions> = (
  state = intialState,
  action
): UserDetailsState => {
  switch (action.type) {
    case USER_DETAILS_FETCH:
      return {
        ...state,
        loading: true,
      }

    case USER_DETAILS_FETCH_SUCCESS:
      return {
        data: {
          id: action.payload.id,
          name: action.payload.name,
          imageUrl: action.payload.avatar_url,
          loginId: action.payload.login_id,
        },
        loading: false,
        error: false,
      }

    case USER_DETAILS_FETCH_FAILURE:
      return {
        data: action.payload,
        loading: false,
        error: true,
      }

    case USER_DETAILS_FETCH_CANCEL:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

export type ProfileMenuState = {
  userDetails: UserDetailsState
}

const ProfileMenuReducer = combineReducers({ userDetails: UserDetailsReducer })

export default ProfileMenuReducer
