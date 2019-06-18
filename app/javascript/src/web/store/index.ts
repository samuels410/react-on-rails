import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers, { StoreState } from './reducers'
import middlewares from './middlewares'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers<StoreState>(reducers),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(middlewares)
export type AppState = StoreState
export default store
