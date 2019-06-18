import { Reducer } from 'redux'
import {
  COURSE_ITEM_CONTENT_FETCH_SUCCESS,
  COURSE_ITEM_CONTENT_FETCH_FAILURE,
} from './CourseItem.types'
import { CourseItemContentActionTypes } from './CourseItem.actions'
import { CourseModuleItemsState } from '../CourseModule.reducer'
import { ModuleItemData } from '../../../../../common/types'

const initialState: CourseModuleItemsState = {
  data: { byId: {} },
  byModule: {},
}

const initialItemState = {}

const courseItemContentReducer: Reducer<
  CourseModuleItemsState,
  CourseItemContentActionTypes
> = (state = initialState, action) => {
  switch (action.type) {
    case COURSE_ITEM_CONTENT_FETCH_SUCCESS: {
      const data = (state.data.byId[action.meta.itemId] ||
        initialItemState) as ModuleItemData
      return {
        ...state,
        data: {
          ...state.data,
          byId: {
            ...state.data.byId,
            [action.meta.itemId]: {
              ...data,
              itemContent: action.payload,
            },
          },
        },
      }
    }
    case COURSE_ITEM_CONTENT_FETCH_FAILURE: {
      const data = (state.data.byId[action.meta.itemId] ||
        initialItemState) as ModuleItemData
      return {
        ...state,
        data: {
          ...state.data,
          byId: {
            ...state.data.byId,
            [action.meta.itemId]: {
              ...data,
              itemContent: action.payload,
            },
          },
        },
      }
    }
    default:
      return state
  }
}

export default courseItemContentReducer
