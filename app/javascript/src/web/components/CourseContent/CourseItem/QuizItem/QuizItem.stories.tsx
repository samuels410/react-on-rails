import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react'
import QuizItem from './QuizItem'

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

storiesOf('Courses/CourseItem/QuizItem', module)
  .addDecorator(withKnobs)
  .add('Not yet taken', () => (
    <QuizItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked={false}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Quiz',
        isCompleted: false,
        content_details: {
          due_at: new Date(currentYear, currentMonth + 2, 1).toUTCString(),
          locked_for_user: false,
        },
      })}
    />
  ))
  .add('Completed', () => (
    <QuizItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked={false}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Quiz',
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
    <QuizItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked={false}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Quiz',
        isCompleted: false,
        content_details: {
          due_at: new Date(currentYear, currentMonth - 2).toUTCString(),
          locked_for_user: false,
        },
      })}
    />
  ))
  .add('Locked for user', () => (
    <QuizItem
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      locked
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Quiz',
        content_details: {
          locked_for_user: true,
        },
      })}
    />
  ))
