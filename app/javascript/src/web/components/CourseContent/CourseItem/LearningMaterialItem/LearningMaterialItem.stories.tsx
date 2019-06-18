import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react'
import LearningMaterialItem from './LearningMaterialItem'

storiesOf('Courses/CourseItem/LearningMaterialItem', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <LearningMaterialItem
      locked={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Learning',
        progress: 0,
      })}
    />
  ))
  .add('Completed', () => (
    <LearningMaterialItem
      locked={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Learning',
        progress: 100,
      })}
    />
  ))
  .add('Not yet started', () => (
    <LearningMaterialItem
      locked={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Learning',
        progress: 0,
      })}
    />
  ))
  .add('Locked for user', () => (
    <LearningMaterialItem
      locked
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Learning',
        progress: 0,
      })}
    />
  ))
