import { CourseListState, courseListReducer } from '../containers/Courses'
import { HeaderReducer, HeaderState } from '../containers/Header'
import {
  CourseModulesState,
  courseModulesReducer,
} from '../containers/CourseContent/CourseModules'
import {
  courseModuleItemsReducer,
  CourseModuleItemsState,
} from '../containers/CourseContent/CourseModule'
import {
  CourseRecordingsState,
  courseRecordingsReducer,
} from '../containers/CourseRecordings'
import {
  industryArticlesReducer,
  IndustryArticlesState,
} from '../containers/IndustryArticles'
import {
  courseGradesReducer,
  CourseGradesState,
} from '../containers/CourseGrades'

export interface StoreState {
  courses: CourseListState
  header: HeaderState
  modules: CourseModulesState
  moduleItems: CourseModuleItemsState
  courseRecordings: CourseRecordingsState
  industryArticles: IndustryArticlesState
  courseGrades: CourseGradesState
}

export default {
  courses: courseListReducer,
  header: HeaderReducer,
  modules: courseModulesReducer,
  moduleItems: courseModuleItemsReducer,
  courseRecordings: courseRecordingsReducer,
  industryArticles: industryArticlesReducer,
  courseGrades: courseGradesReducer,
}
