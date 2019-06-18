import ProfileMenuReducer, {
  ProfileMenuState as oldProfileMenuState,
} from './ProfileMenu.reducer'
import profileMenuMiddleware from './ProfileMenu.middlewares'

export type ProfileMenuState = oldProfileMenuState

export { ProfileMenuReducer, profileMenuMiddleware }

export { default } from './ProfileMenu'
