import React from 'react'
import ItemPath from '../../containers/CourseContentItem/ItemPath'
import ItemContent from '../../containers/CourseContentItem/ItemContent'

interface CourseContentItemProps {
  match: {
    params: {
      courseId: string | number
      moduleId: string | number
      itemId: string | number
    }
  }
}

const CourseContentItem = (props: CourseContentItemProps) => (
  <div style={{ height: '100%' }}>
    <ItemPath
      courseId={props.match.params.courseId}
      itemId={props.match.params.itemId}
    />
    <ItemContent
      courseId={props.match.params.courseId}
      moduleId={props.match.params.moduleId}
      itemId={props.match.params.itemId}
    />
  </div>
)

export default CourseContentItem
