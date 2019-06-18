import { CourseID } from '../../../common/types'

export interface CourseData {
  desc?: string
  course_id: CourseID
  course_name: string
  image_url?: string
  start_date?: string
  end_date?: string
}

export interface ActiveCourseData extends CourseData {
  marks?: number
  total_marks?: number
  progress?: number
  end_date?: string
  grade?: string
}

export interface CompletedCourseData extends CourseData {
  grade?: string
  marks: number
  total_marks: number
}

export interface UpcomingCourseData extends CourseData {}

export interface FailedCourseData extends CompletedCourseData {}
