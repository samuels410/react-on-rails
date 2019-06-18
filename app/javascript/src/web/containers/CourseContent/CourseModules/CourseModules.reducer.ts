import { Reducer } from 'redux'
import * as types from './CourseModules.types'
import {
  CourseModulesActionTypes,
  fetchCourseModulesSuccess,
} from './CourseModules.actions'
import { ModuleID, CourseID } from '../../../../common/types'

// Course Modules
export interface ModuleData {
  id: ModuleID
  name?: string
}

interface CourseModuleData {
  byId: { [s in ModuleID]: ModuleData }
}

export interface CourseModulesState {
  data: CourseModuleData
  byCourse: {
    [s in CourseID]: {
      data: ModuleID[] | Error | null
      loading: boolean
      error: boolean
    }
  }
}

const initialStateModules: CourseModulesState = {
  data: { byId: {} },
  byCourse: {},
}

function getNormalizedData(
  state: CourseModulesState,
  action: ReturnType<typeof fetchCourseModulesSuccess>
) {
  const courseModulesList = state.byCourse[action.meta.courseId].data
  const modulesList: ModuleID[] = Array.isArray(courseModulesList)
    ? courseModulesList
    : []
  const moduleMap = action.payload.reduce(
    (acc: { [s in ModuleID]: ModuleData }, item: ModuleData) => {
      modulesList.push(item.id)
      acc[item.id] = item
      return acc
    },
    {}
  )

  const uniqueModulesList = [...new Set(modulesList)]
  return {
    data: moduleMap,
    list: uniqueModulesList,
  }
}

const courseModulesReducer: Reducer<
  CourseModulesState,
  CourseModulesActionTypes
> = (state = initialStateModules, action): CourseModulesState => {
  switch (action.type) {
    case types.COURSE_MODULES_FETCH: {
      return {
        ...state,
        byCourse: {
          ...state.byCourse,
          [action.meta.courseId]: {
            ...state.byCourse[action.meta.courseId],
            loading: true,
          },
        },
      }
    }
    case types.COURSE_MODULES_FETCH_FAILURE: {
      return {
        ...state,
        byCourse: {
          ...state.byCourse,
          [action.meta.courseId]: {
            data: action.payload,
            loading: false,
            error: false,
          },
        },
      }
    }
    case types.COURSE_MODULES_FETCH_SUCCESS: {
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
            ...state.byCourse[action.meta.courseId],
            data: res.list,
            loading: false,
            error: false,
          },
        },
      }
    }
    case types.COURSE_MODULES_FETCH_CANCEL: {
      return {
        ...state,
        byCourse: {
          ...state.byCourse,
          [action.meta.courseId]: {
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
export default courseModulesReducer
