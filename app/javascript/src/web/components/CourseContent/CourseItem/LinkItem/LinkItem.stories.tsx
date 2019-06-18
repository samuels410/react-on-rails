import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react'
import LinkItem from './LinkItem'

storiesOf('Courses/CourseItem/LinkItem', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <LinkItem
      locked={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'ExternalUrl',
        external_url: 'https://www.google.com',
      })}
    />
  ))
  .add('Locked for user', () => (
    <LinkItem
      locked
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'ExternalUrl',
        external_url: 'https://www.google.com',
      })}
    />
  ))
