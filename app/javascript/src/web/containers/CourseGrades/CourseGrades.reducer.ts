import { Reducer } from 'redux'
import {
  COURSE_GRADES_FETCH,
  COURSE_GRADES_FETCH_CANCEL,
  COURSE_GRADES_FETCH_FAILURE,
  COURSE_GRADES_FETCH_SUCCESS,
} from './CourseGrades.types'
import { GradedItemData, GradedItemID, CourseID } from '../../../common/types'
import {
  CourseGradesActionTypes,
  fetchCourseGradesSuccess,
} from './CourseGrades.actions'

export interface CourseGradesState {
  data: {
    byId: { [key in GradedItemID]?: GradedItemData }
  }
  byCourse: {
    [key in CourseID]?: {
      data: GradedItemID[]
      loading: boolean
      error: false | Error
    }
  }
}

const addDummyData = (item: GradedItemData): GradedItemData => {
  return {
    ...item,
    date: `2019-01-${Math.trunc(Math.random() * 31)}`,
    id: Math.trunc(Math.random() * 1000),
    score: Math.trunc(Math.random() * 100),
    total: 100,
    title: `Assignment: ${Math.trunc(Math.random() * 1000)}`,
  }
}

function getNormalizedData(
  state: CourseGradesState,
  action: ReturnType<typeof fetchCourseGradesSuccess>
) {
  const courseRecordingsAPI = state.byCourse[action.payload.courseId]
  let gradedItemsList: GradedItemID[] =
    courseRecordingsAPI && Array.isArray(courseRecordingsAPI.data)
      ? courseRecordingsAPI.data.slice()
      : []

  const moduleMap = action.payload.reduce(
    (acc: { [s in GradedItemID]: GradedItemData }, item: GradedItemData) => {
      gradedItemsList.push(item.id)
      acc[item.id] = addDummyData(item)
      return acc
    },
    {}
  )

  gradedItemsList = [...new Set(gradedItemsList)]
  return {
    data: moduleMap,
    list: gradedItemsList,
  }
}

const initialAPIState = {
  data: [],
  loading: false,
  error: false as false,
}

const initialState = {
  data: { byId: {} },
  byCourse: {},
}

const courseGradesReducer: Reducer<
  CourseGradesState,
  CourseGradesActionTypes
> = (state = initialState, action): CourseGradesState => {
  switch (action.type) {
    case COURSE_GRADES_FETCH: {
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
    case COURSE_GRADES_FETCH_SUCCESS: {
      const res = getNormalizedData(state, action)
      res.list.sort((a: GradedItemID, b: GradedItemID) =>
        res.data[b] && res.data[a]
          ? new Date(res.data[b].date).getTime() -
            new Date(res.data[a].date).getTime()
          : 1
      )
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

    case COURSE_GRADES_FETCH_FAILURE: {
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
    case COURSE_GRADES_FETCH_CANCEL: {
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

export default courseGradesReducer
