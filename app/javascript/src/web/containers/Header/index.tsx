import HeaderContainer from './Header'
import HeaderMiddleware from './Header.middlewares'
import HeaderReducer, { HeaderState as oldHeaderState } from './Header.reducer'

export type HeaderState = oldHeaderState

export { HeaderMiddleware, HeaderReducer }
export default HeaderContainer
