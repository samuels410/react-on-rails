import industryArticlesMiddleware from './IndustryArticles.middlewares'
import industryArticlesReducer, {
  IndustryArticlesState,
} from './IndustryArticles.reducer'

export { default } from './IndustryArticles'
export type IndustryArticlesState = IndustryArticlesState

export { industryArticlesMiddleware, industryArticlesReducer }
