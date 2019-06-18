import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react'
import AssignmentItem from './AssignmentItem'

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

storiesOf('Courses/CourseItem/AssignmentItem', module)
  .addDecorator(withKnobs)
  .add('Not yet taken', () => (
    <AssignmentItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked={false}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Assignment',
        isCompleted: false,
        content_details: {
          due_at: new Date(currentYear, currentMonth + 2, 1)
            .getTime()
            .toString(),
          locked_for_user: false,
        },
      })}
    />
  ))
  .add('Completed', () => (
    <AssignmentItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked={false}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Assignment',
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
    <AssignmentItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked={false}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Assignment',
        isCompleted: false,
        content_details: {
          due_at: new Date(currentYear, currentMonth - 2).toUTCString(),
          locked_for_user: false,
        },
      })}
    />
  ))
  .add('Locked for user', () => (
    <AssignmentItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Assignment',
        content_details: {
          locked_for_user: true,
        },
      })}
    />
  ))
