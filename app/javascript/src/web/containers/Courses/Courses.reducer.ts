import { Reducer } from 'redux'
import { CourseListActions } from './Courses.actions'
import {
  COURSE_LIST_FETCH,
  COURSE_LIST_FETCH_FAILURE,
  COURSE_LIST_FETCH_SUCCESS,
  COURSE_LIST_FETCH_CANCEL,
  COURSE_DETAILS_FETCH,
  COURSE_DETAILS_FETCH_SUCCESS,
  COURSE_DETAILS_FETCH_FAILURE,
  COURSE_DETAILS_FETCH_CANCEL,
} from './Courses.types'
import {
  CompletedCourseData,
  FailedCourseData,
  ActiveCourseData,
  UpcomingCourseData,
  CourseData as BasicCourseData,
} from '../../components/CourseCards'
import { CourseID, ProgramID } from '../../../common/types'

export type CourseData =
  | CompletedCourseData
  | FailedCourseData
  | ActiveCourseData
  | UpcomingCourseData
  | BasicCourseData

export interface CourseListData {
  byId: { [key in CourseID]: CourseData }
  completedIds?: CourseID[]
  upcomingIds?: CourseID[]
  failedIds?: CourseID[]
  activeIds?: CourseID[]
}

export interface CourseListState {
  data: CourseListData
  byProgram: {
    [key in ProgramID]: {
      data: CourseID[] | null
      loading: boolean
      error: boolean | Error
    }
  }
  byCourse: {
    [key in CourseID]: {
      data: CourseID[] | null
      loading: boolean
      error: boolean | Error
    }
  }
}

const initialState: CourseListState = {
  data: { byId: {} },
  byProgram: {},
  byCourse: {},
}

const sortByTimeAsc = (timeX?: number | string, timeY?: number | string) =>
  new Date(timeX || Number.MAX_SAFE_INTEGER).getTime() -
  new Date(timeY || Number.MAX_SAFE_INTEGER).getTime()

/**
 * Active Course with nearest course end date first and then next course and so on.
 */
const activeCourseHandler = (data: ActiveCourseData[]) =>
  data
    .slice()
    .sort((a, b) => sortByTimeAsc(a.end_date, b.end_date))
    .map(d => ({
      ...d,
      desc:
        d.desc ||
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices neque sed justo vulputate posuere.',
      progress: d.progress || Math.trunc(Math.random() * 100),
    }))

/**
 * Course with the nearest course start date first and then next course and so on.
 */
const upcomingCourseHandler = (data: UpcomingCourseData[]) =>
  data
    .slice()
    .sort((a, b) => sortByTimeAsc(a.start_date, b.start_date))
    .map(d => ({
      ...d,
      desc:
        d.desc ||
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices neque sed justo vulputate posuere.',
      start_date: d.start_date || '2019-08-01',
    }))

/**
 * Course which is completed at the latest first and then next course and so on.
 */
const completedCourseHandler = (data: CompletedCourseData[]) =>
  data
    .slice()
    .sort((a, b) => sortByTimeAsc(a.start_date, b.start_date))
    .reverse()
    .filter(a => a.grade !== 'IC')
    .map(d => ({
      ...d,
      desc:
        d.desc ||
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices neque sed justo vulputate posuere.',
      start_date: d.start_date || '2019-08-01',
    }))

/**
 * TODO: Yet to get proper order
 */
const failedCourseHandler = (data: FailedCourseData[]) =>
  data
    .slice()
    .sort((a, b) => sortByTimeAsc(a.end_date, b.end_date))
    .reverse()
    .filter(a => a.grade === 'IC')
    .map(d => ({
      ...d,
      desc:
        d.desc ||
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices neque sed justo vulputate posuere.',
    }))

const courseListDataHandler = (data: any): CourseListData => {
  const completedCourses = completedCourseHandler(data.completed_courses)
  const failedCourses = failedCourseHandler(data.completed_courses)
  const activeCourses = activeCourseHandler(data.active_courses)
  const upcomingCourses = upcomingCourseHandler(data.upcoming_courses)

  const courses: CourseListData = {
    byId: {},
    completedIds: [],
    failedIds: [],
    upcomingIds: [],
    activeIds: [],
  }

  completedCourses.forEach(c => {
    courses.byId[c.course_id] = c
    if (courses.completedIds) courses.completedIds.push(c.course_id)
  })

  failedCourses.forEach(c => {
    courses.byId[c.course_id] = c
    if (courses.completedIds) courses.completedIds.push(c.course_id)
  })

  activeCourses.forEach(c => {
    courses.byId[c.course_id] = c
    if (courses.activeIds) courses.activeIds.push(c.course_id)
  })

  upcomingCourses.forEach(c => {
    courses.byId[c.course_id] = c
    if (courses.upcomingIds) courses.upcomingIds.push(c.course_id)
  })
  return courses
}

const fetchCourseData = (data: any): BasicCourseData => {
  const courseDetailsData: BasicCourseData = {
    course_name: data.name,
    course_id: data.id,
  }
  return courseDetailsData
}

const courseListReducer: Reducer<CourseListState, CourseListActions> = (
  state = initialState,
  action
): CourseListState => {
  switch (action.type) {
    case COURSE_LIST_FETCH: {
      return {
        ...state,
        byProgram: {
          [action.meta.programId]: {
            ...state.byProgram[action.meta.programId],
            loading: true,
          },
        },
      }
    }
    case COURSE_LIST_FETCH_SUCCESS: {
      const processedData = courseListDataHandler(action.payload)
      return {
        ...state,
        data: processedData,
        byProgram: {
          [action.meta.programId]: {
            data: Object.keys(processedData.byId),
            loading: false,
            error: false,
          },
        },
      }
    }
    case COURSE_LIST_FETCH_CANCEL: {
      return {
        ...state,
        byProgram: {
          [action.meta.programId]: {
            ...state.byProgram[action.meta.programId],
            loading: false,
          },
        },
      }
    }
    case COURSE_LIST_FETCH_FAILURE: {
      return {
        ...state,
        byProgram: {
          [action.meta.programId]: {
            ...state.byProgram[action.meta.programId],
            loading: false,
            error: action.payload,
          },
        },
      }
    }
    case COURSE_DETAILS_FETCH: {
      return {
        ...state,
        byCourse: {
          [action.meta.courseId]: {
            ...state.byCourse[action.meta.courseId],
            loading: true,
          },
        },
      }
    }
    case COURSE_DETAILS_FETCH_SUCCESS: {
      const courseProcessedData = fetchCourseData(action.payload)
      return {
        ...state,
        data: {
          ...state.data,
          byId: {
            ...state.data.byId,
            [action.meta.courseId]: {
              ...state.data.byId[action.meta.courseId],
              ...courseProcessedData,
            },
          },
        },
        byCourse: {
          [action.meta.courseId]: {
            data: [action.payload.id],
            loading: false,
            error: false,
          },
        },
      }
    }
    case COURSE_DETAILS_FETCH_FAILURE: {
      return {
        ...state,
        byCourse: {
          [action.meta.courseId]: {
            ...state.byCourse[action.meta.courseId],
            loading: false,
            error: action.payload,
          },
        },
      }
    }
    case COURSE_DETAILS_FETCH_CANCEL: {
      return {
        ...state,
        byCourse: {
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

export default courseListReducer
