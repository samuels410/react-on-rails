import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react'
import DiscussionQuestionItem from './DiscussionQuestionItem'

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

storiesOf('Courses/CourseItem/DiscussionQuestionItem', module)
  .addDecorator(withKnobs)
  .add('Not yet taken', () => (
    <DiscussionQuestionItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked={false}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Discussion',
        isCompleted: false,
        content_details: {
          due_at: new Date(currentYear, currentMonth + 2, 1).toUTCString(),
          locked_for_user: false,
        },
      })}
    />
  ))
  .add('Completed', () => (
    <DiscussionQuestionItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked={false}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Discussion',
        isCompleted: true,
        score: 12,
        total: 20,
        content_details: {
          locked_for_user: false,
        },
      })}
    />
  ))
  .add('Overdue', () => (
    <DiscussionQuestionItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked={false}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Discussion',
        isCompleted: false,
        content_details: {
          due_at: new Date(currentYear, currentMonth - 2).toUTCString(),
          locked_for_user: false,
        },
      })}
    />
  ))
  .add('Locked for user', () => (
    <DiscussionQuestionItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Discussion',
        content_details: {
          locked_for_user: true,
        },
      })}
    />
  ))
