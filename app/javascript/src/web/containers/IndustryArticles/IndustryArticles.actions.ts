import {
  INDUSTRY_ARTICLES_FETCH,
  INDUSTRY_ARTICLES_FETCH_CANCEL,
  INDUSTRY_ARTICLES_FETCH_FAILURE,
  INDUSTRY_ARTICLES_FETCH_SUCCESS,
} from './IndustryArticles.types'
import { CourseID } from '../../../common/types'

interface IndustryArticlesFetchParams {
  courseId: CourseID
}

interface IndustryArticlesMetaParams {
  courseId: CourseID
}

export const fetchIndustryArticles = (
  payload: IndustryArticlesFetchParams,
  meta: IndustryArticlesMetaParams
) => ({
  type: INDUSTRY_ARTICLES_FETCH as typeof INDUSTRY_ARTICLES_FETCH,
  payload,
  meta,
})

export const fetchIndustryArticlesSuccess = (
  payload: any,
  meta: IndustryArticlesMetaParams
) => ({
  type: INDUSTRY_ARTICLES_FETCH_SUCCESS as typeof INDUSTRY_ARTICLES_FETCH_SUCCESS,
  payload,
  meta,
})

export const fetchIndustryArticlesFailure = (
  payload: Error,
  meta: IndustryArticlesMetaParams
) => ({
  type: INDUSTRY_ARTICLES_FETCH_FAILURE as typeof INDUSTRY_ARTICLES_FETCH_FAILURE,
  payload,
  meta,
})

export const fetchIndustryArticlesCancel = (
  payload: any,
  meta: IndustryArticlesMetaParams
) => ({
  type: INDUSTRY_ARTICLES_FETCH_CANCEL as typeof INDUSTRY_ARTICLES_FETCH_CANCEL,
  payload,
  meta,
})

export type IndustryFetchActionTypes =
  | ReturnType<typeof fetchIndustryArticles>
  | ReturnType<typeof fetchIndustryArticlesSuccess>
  | ReturnType<typeof fetchIndustryArticlesFailure>
  | ReturnType<typeof fetchIndustryArticlesCancel>
