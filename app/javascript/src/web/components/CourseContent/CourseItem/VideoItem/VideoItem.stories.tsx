import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react'
import VideoItem from './VideoItem'

storiesOf('Courses/CourseItem/VideoItem', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <VideoItem
      locked={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Video',
        videoWatchedLength: 12,
        videoLength: 40,
      })}
    />
  ))
  .add('Completed', () => (
    <VideoItem
      locked={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Video',
        videoWatchedLength: 40,
        videoLength: 40,
      })}
    />
  ))
  .add('Not yet started', () => (
    <VideoItem
      locked={false}
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Video',
        videoWatchedLength: 0,
        videoLength: 40,
      })}
    />
  ))
  .add('Locked for user', () => (
    <VideoItem
      locked
      itemId={number('Item ID', 1)}
      moduleId={number('Module ID', 2)}
      courseId={number('Course ID', 3)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'Video',
        progress: 0,
      })}
    />
  ))
