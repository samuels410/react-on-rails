import { all } from 'redux-saga/effects'
import { coursesMiddleware } from '../containers/Courses'
import { HeaderMiddleware } from '../containers/Header'
import { courseModulesMiddleware } from '../containers/CourseContent/CourseModules'
import { courseModuleItemsMiddleware } from '../containers/CourseContent/CourseModule'
import { courseRecordingsMiddleware } from '../containers/CourseRecordings'
import { industryArticlesMiddleware } from '../containers/IndustryArticles'
import { courseGradesMiddleware } from '../containers/CourseGrades'

export default function* rootSaga() {
  yield all([
    ...coursesMiddleware,
    ...HeaderMiddleware,
    ...courseModulesMiddleware,
    ...courseModuleItemsMiddleware,
    ...courseRecordingsMiddleware,
    ...industryArticlesMiddleware,
    ...courseGradesMiddleware,
  ])
}
