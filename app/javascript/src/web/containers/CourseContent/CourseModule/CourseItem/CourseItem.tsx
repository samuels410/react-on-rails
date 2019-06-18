import React from 'react'
import {
  CourseID,
  ModuleID,
  ItemID,
  ModuleItemData,
} from '../../../../../common/types'
import ResourceItem from './ResourceItem'
import {
  FallbackItem,
  AssignmentItem,
  DiscussionQuestionItem,
  VideoItem,
  SubHeaderItem,
  QuizItem,
  LearningMaterialItem,
  LinkItem,
} from '../../../../components/CourseContent/CourseItem'

interface Props {
  courseId: CourseID
  moduleId: ModuleID
  itemId: ItemID
  locked: boolean
  moduleItem: ModuleItemData
}

const CourseItem = (props: Props) => {
  switch (props.moduleItem.type) {
    case 'Assignment':
      return <AssignmentItem {...props} moduleItem={props.moduleItem} />
    case 'Discussion':
      return <DiscussionQuestionItem {...props} moduleItem={props.moduleItem} />
    case 'ExternalUrl':
      return <LinkItem {...props} moduleItem={props.moduleItem} />
    case 'File':
      return <ResourceItem {...props} moduleItem={props.moduleItem} />
    case 'Page':
      return <VideoItem {...props} moduleItem={props.moduleItem} />
    case 'Quiz':
      return <QuizItem {...props} moduleItem={props.moduleItem} />
    case 'SubHeader':
      return <SubHeaderItem {...props} moduleItem={props.moduleItem} />
    case 'Video':
      return <VideoItem {...props} moduleItem={props.moduleItem} />
    case 'Learning':
      return <LearningMaterialItem {...props} moduleItem={props.moduleItem} />
    default:
      return <FallbackItem {...props} moduleItem={props.moduleItem} />
  }
}

export default CourseItem
