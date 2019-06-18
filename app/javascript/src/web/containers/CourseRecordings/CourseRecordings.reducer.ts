import { Reducer } from 'redux'
import {
  COURSE_RECORDINGS_FETCH_SUCCESS,
  COURSE_RECORDINGS_FETCH,
  COURSE_RECORDINGS_FETCH_FAILURE,
  COURSE_RECORDINGS_FETCH_CANCEL,
} from './CourseRecordings.types'
import {
  CourseRecordingsActionTypes,
  fetchCourseRecordingsSuccess,
} from './CourseRecordings.actions'
import {
  CourseRecordingData,
  RecordingID,
  CourseID,
} from '../../../common/types'

export interface CourseRecordingsState {
  data: {
    byId: { [s in RecordingID]?: CourseRecordingData }
  }
  byCourse: {
    [s in CourseID]?: {
      data: RecordingID[]
      loading: boolean
      error: false | Error
    }
  }
}

function getNormalizedData(
  state: CourseRecordingsState,
  action: ReturnType<typeof fetchCourseRecordingsSuccess>
) {
  const courseRecordingsAPI = state.byCourse[action.payload.courseId]
  let recordingsList: RecordingID[] =
    courseRecordingsAPI && Array.isArray(courseRecordingsAPI.data)
      ? courseRecordingsAPI.data.slice()
      : []

  const moduleMap = action.payload.reduce(
    (
      acc: { [s in RecordingID]: CourseRecordingData },
      item: CourseRecordingData
    ) => {
      recordingsList.push(item.id)
      acc[item.id] = item
      return acc
    },
    {}
  )

  recordingsList = [...new Set(recordingsList)]
  return {
    data: moduleMap,
    list: recordingsList,
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

const courseRecordingsReducer: Reducer<
  CourseRecordingsState,
  CourseRecordingsActionTypes
> = (state = initialState, action): CourseRecordingsState => {
  switch (action.type) {
    case COURSE_RECORDINGS_FETCH: {
      return {
        ...state,
        byCourse: {
          ...state.byCourse,
          [action.meta.courseId]: {
            ...initialAPIState,
            ...state.byCourse[action.meta.courseId],
            loading: true,
            error: false,
          },
        },
      }
    }
    case COURSE_RECORDINGS_FETCH_SUCCESS: {
      const res = getNormalizedData(state, action)
      res.list.sort(
        (a: RecordingID, b: RecordingID) =>
          res.data[b].createdAt - res.data[a].createdAt
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
    case COURSE_RECORDINGS_FETCH_FAILURE: {
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
    case COURSE_RECORDINGS_FETCH_CANCEL: {
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

export default courseRecordingsReducer
