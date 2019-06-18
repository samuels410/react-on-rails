import { combineReducers } from 'redux'
import { ProfileMenuReducer, ProfileMenuState } from './ProfileMenu'

export type HeaderState = {
  profile: ProfileMenuState
}

const HeaderReducer = combineReducers<HeaderState>({
  profile: ProfileMenuReducer,
})

export default HeaderReducer
