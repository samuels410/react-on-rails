import { Reducer } from 'redux'
import {
  ItemID,
  ModuleID,
  ModuleItemData,
  VideoModuleItemData,
} from '../../../../common/types'
import {
  CourseModuleItemsActionTypes,
  fetchCourseModuleItemsSuccess,
} from './CourseModule.actions'
import {
  COURSE_MODULE_ITEMS_FETCH,
  COURSE_MODULE_ITEMS_BULK_INSERT,
  COURSE_MODULE_ITEMS_FETCH_CANCEL,
  COURSE_MODULE_ITEMS_FETCH_FAILURE,
  COURSE_MODULE_ITEMS_FETCH_SUCCESS,
} from './CourseModule.types'
import {
  COURSE_ITEM_CONTENT_FETCH_FAILURE,
  COURSE_ITEM_CONTENT_FETCH_SUCCESS,
  courseItemContentReducer,
  CourseItemContentActionTypes,
} from './CourseItem'

interface CourseModuleItemData {
  byId: { [s in ItemID]?: ModuleItemData }
}

export interface CourseModuleItemsState {
  data: CourseModuleItemData
  byModule: {
    [s in ModuleID]?: {
      data: ItemID[]
      count: number
      loading: boolean
      error: false | Error
    }
  }
}

function addDummyData(item: ModuleItemData): ModuleItemData {
  switch (item.type) {
    case 'Assignment': {
      const isCompleted = Math.random() < 0.5
      return {
        ...item,
        isCompleted,
        ...(!isCompleted
          ? {
              content_details: {
                locked_for_user: false,
                due_at: new Date(
                  new Date().getTime() * Math.random() * 2
                ).toUTCString(),
                ...item.content_details,
              },
            }
          : { score: Math.trunc(Math.random() * 100), total: 100 }),
      }
    }
    case 'Discussion': {
      const isCompleted = Math.random() < 0.5
      return {
        ...item,
        isCompleted,
        ...(!isCompleted
          ? {
              content_details: {
                due_at: new Date(
                  new Date().getTime() * Math.random() * 2
                ).toUTCString(),
                ...item.content_details,
              },
            }
          : { score: Math.trunc(Math.random() * 100), total: 100 }),
      }
    }
    case 'Page': {
      return {
        ...item,
        videoWatchedLength: Math.trunc(Math.random() * 100),
        videoLength: 100,
      }
    }
    case 'Quiz': {
      const isCompleted = Math.random() < 0.5
      return {
        ...item,
        isCompleted,
        ...(!isCompleted
          ? {
              content_details: {
                due_at: new Date(
                  new Date().getTime() * Math.random() * 2
                ).toUTCString(),
                ...item.content_details,
              },
            }
          : { score: Math.trunc(Math.random() * 100), total: 100 }),
      }
    }
    default:
      return item
  }
}

const initialStateModuleItems: CourseModuleItemsState = {
  data: {
    byId: {},
  },
  byModule: {},
}
const initialModuleAPIData: CourseModuleItemsState['byModule']['x'] = {
  data: [],
  count: 0,
  loading: false,
  error: false,
}

function getNormalizedData(
  state: CourseModuleItemsState,
  action: Pick<
    ReturnType<typeof fetchCourseModuleItemsSuccess>,
    'meta' | 'payload'
  >
) {
  const moduleAPIData = state.byModule[action.meta.moduleId]
  const moduleItemsList: ItemID[] =
    moduleAPIData && Array.isArray(moduleAPIData.data) ? moduleAPIData.data : []

  const moduleItemsMap = action.payload.reduce(
    (
      accumulator: { [s in ModuleID]: ModuleItemData },
      item: ModuleItemData
    ) => {
      accumulator[item.id] = addDummyData(item)
      moduleItemsList.push(item.id)
      return accumulator
    },
    {}
  )

  const uniqueModuleItemsList = [...new Set(moduleItemsList)]
  return {
    data: moduleItemsMap,
    list: uniqueModuleItemsList,
  }
}

const courseModuleItemsReducer: Reducer<
  CourseModuleItemsState,
  CourseModuleItemsActionTypes | CourseItemContentActionTypes
> = (state = initialStateModuleItems, action): CourseModuleItemsState => {
  switch (action.type) {
    case COURSE_MODULE_ITEMS_FETCH: {
      const moduleAPIData =
        state.byModule[action.meta.moduleId] || initialModuleAPIData
      return {
        ...state,
        byModule: {
          ...state.byModule,
          [action.meta.moduleId]: {
            ...moduleAPIData,
            loading: true,
            error: false,
          },
        },
      }
    }
    case COURSE_MODULE_ITEMS_FETCH_FAILURE: {
      const moduleAPIData =
        state.byModule[action.meta.moduleId] || initialModuleAPIData
      return {
        ...state,
        byModule: {
          ...state.byModule,
          [action.meta.moduleId]: {
            ...moduleAPIData,
            loading: false,
            error: action.payload,
          },
        },
      }
    }
    case COURSE_MODULE_ITEMS_FETCH_SUCCESS: {
      const res = getNormalizedData(state, action)

      const moduleAPIData =
        state.byModule[action.meta.moduleId] || initialModuleAPIData
      return {
        ...state,
        data: {
          ...state.data,
          byId: {
            ...state.data.byId,
            ...res.data,
          },
        },
        byModule: {
          ...state.byModule,
          [action.meta.moduleId]: {
            ...moduleAPIData,
            data: res.list,
            loading: false,
            error: false,
          },
        },
      }
    }
    case COURSE_MODULE_ITEMS_FETCH_CANCEL: {
      const moduleAPIData =
        state.byModule[action.meta.moduleId] || initialModuleAPIData
      return {
        ...state,
        byModule: {
          ...state.byModule,
          [action.meta.moduleId]: {
            ...moduleAPIData,
            data: moduleAPIData.data,
            error: false,
            loading: false,
          },
        },
      }
    }
    case COURSE_MODULE_ITEMS_BULK_INSERT: {
      let byId = {}
      let byModule = {}
      Object.entries(action.payload).forEach(([moduleId, moduleObj]) => {
        const res = getNormalizedData(state, {
          payload: moduleObj.items,
          meta: { moduleId },
        })
        byId = {
          ...byId,
          ...res.data,
        }
        byModule = {
          ...byModule,
          [moduleId]: {
            data: res.list,
            count: moduleObj.count,
            loading: false,
            error: false,
          },
        }
      })
      return {
        ...state,
        data: {
          ...state.data,
          byId: {
            ...state.data.byId,
            ...byId,
          },
        },
        byModule: {
          ...state.byModule,
          ...byModule,
        },
      }
    }
    case COURSE_ITEM_CONTENT_FETCH_FAILURE:
    case COURSE_ITEM_CONTENT_FETCH_SUCCESS:
      return courseItemContentReducer(state, action)
    default:
      return state
  }
}

export default courseModuleItemsReducer
