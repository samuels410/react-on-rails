import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import ResourceItem from './ResourceItem'

storiesOf('Courses/CourseItem/ResourceItem', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <ResourceItem
      locked={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      loading={false}
      error={false}
      fetchResource={action('Download Triggered')}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'File',
        progress: 60,
        url: 'url',
        content_details: {
          locked_for_user: false,
        },
      })}
    />
  ))
  .add('Loading State', () => (
    <ResourceItem
      locked={false}
      loading
      error={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      fetchResource={action('Download Triggered')}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: 'Introduction to Python',
        type: 'File',
        url: 'url',
        content_details: {
          locked_for_user: false,
        },
      })}
    />
  ))
  .add('Locked for user', () => (
    <ResourceItem
      locked
      loading
      error={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      fetchResource={action('Download Triggered')}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: 'Introduction to Python',
        type: 'File',
        url: 'url',
      })}
    />
  ))
