import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react'
import DefaultItem from './DefaultItem'

storiesOf('Courses/CourseItem/DefaultItem', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <DefaultItem
      locked={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: '',
      })}
    />
  ))
  .add('Locked for user', () => (
    <DefaultItem
      locked
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: '',
      })}
    />
  ))
