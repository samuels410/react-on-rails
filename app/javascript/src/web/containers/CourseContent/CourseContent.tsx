import React from 'react'
import { CourseID } from '../../../common/types'
import CourseModules from './CourseModules/CourseModules'

interface Props {
  courseId: CourseID
}

const CourseContent = (props: Props) => {
  return <CourseModules courseId={props.courseId} />
}

export default CourseContent
