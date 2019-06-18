import { Reducer } from 'redux'
import {
  INDUSTRY_ARTICLES_FETCH,
  INDUSTRY_ARTICLES_FETCH_CANCEL,
  INDUSTRY_ARTICLES_FETCH_FAILURE,
  INDUSTRY_ARTICLES_FETCH_SUCCESS,
} from './IndustryArticles.types'
import {
  IndustryArticleData,
  IndustryArticleID,
  CourseID,
} from '../../../common/types'
import {
  IndustryFetchActionTypes,
  fetchIndustryArticlesSuccess,
} from './IndustryArticles.actions'

export interface IndustryArticlesState {
  data: {
    byId: { [k in IndustryArticleID]?: IndustryArticleData }
  }
  byCourse: {
    [k in CourseID]?: {
      data: IndustryArticleID[]
      loading: boolean
      error: false | Error
    }
  }
}

function getNormalizedData(
  state: IndustryArticlesState,
  action: ReturnType<typeof fetchIndustryArticlesSuccess>
) {
  const industryArticlesAPI = state.byCourse[action.payload.courseId]
  let articlesList: IndustryArticleID[] =
    industryArticlesAPI && Array.isArray(industryArticlesAPI.data)
      ? industryArticlesAPI.data.slice()
      : []

  const moduleMap = action.payload.reduce(
    (
      acc: { [s in IndustryArticleID]: IndustryArticleData },
      item: IndustryArticleData
    ) => {
      articlesList.push(item.id)
      acc[item.id] = item
      return acc
    },
    {}
  )

  articlesList = [...new Set(articlesList)]
  return {
    data: moduleMap,
    list: articlesList,
  }
}

const initialState: IndustryArticlesState = {
  data: { byId: {} },
  byCourse: {},
}

const initialAPIState: IndustryArticlesState['byCourse']['x'] = {
  data: [],
  loading: false,
  error: false,
}

const industryArticlesReducer: Reducer<
  IndustryArticlesState,
  IndustryFetchActionTypes
> = (state = initialState, action): IndustryArticlesState => {
  switch (action.type) {
    case INDUSTRY_ARTICLES_FETCH: {
      return {
        ...state,
        byCourse: {
          ...state.byCourse,
          [action.meta.courseId]: {
            ...initialAPIState,
            ...state.byCourse[action.meta.courseId],
            loading: true,
          },
        },
      }
    }
    case INDUSTRY_ARTICLES_FETCH_SUCCESS: {
      const res = getNormalizedData(state, action)
      return {
        ...state,
        data: {
          ...state.data,
          byId: {
            ...state.data.byId,
            ...res.data,
          },
        },
        byCourse: {
          ...state.byCourse,
          [action.meta.courseId]: {
            ...initialAPIState,
            ...state.byCourse[action.meta.courseId],
            data: res.list,
            loading: false,
            error: false,
          },
        },
      }
    }
    case INDUSTRY_ARTICLES_FETCH_FAILURE: {
      return {
        ...state,
        byCourse: {
          ...state.byCourse,
          [action.meta.courseId]: {
            ...initialAPIState,
            ...state.byCourse[action.meta.courseId],
            loading: false,
            error: action.payload,
          },
        },
      }
    }
    case INDUSTRY_ARTICLES_FETCH_CANCEL: {
      return {
        ...state,
        byCourse: {
          ...state.byCourse,
          [action.meta.courseId]: {
            ...initialAPIState,
            ...state.byCourse[action.meta.courseId],
            loading: false,
          },
        },
      }
    }
    default:
      return state
  }
}

export default industryArticlesReducer
