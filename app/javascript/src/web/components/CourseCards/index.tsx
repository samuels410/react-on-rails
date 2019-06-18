import ActiveCard from './Active'
import FailedCard from './Failed'
import CompletedCard from './Completed'
import UpcomingCard from './Upcoming'

import {
  CompletedCourseData,
  UpcomingCourseData,
  FailedCourseData,
  ActiveCourseData,
  CourseData,
} from './CourseCards.types'

export type CompletedCourseData = CompletedCourseData
export type UpcomingCourseData = UpcomingCourseData
export type ActiveCourseData = ActiveCourseData
export type FailedCourseData = FailedCourseData
export type CourseData = CourseData

export { ActiveCard, FailedCard, UpcomingCard, CompletedCard }
