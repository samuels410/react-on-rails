import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs/react'
import CourseRecording from './CourseRecording'

storiesOf('Courses/CourseRecording', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div style={{ width: 350 }}>
      <CourseRecording
        recordingId={34234}
        data={object('data', {
          authorName: 'Kedar Joshi',
          imageUrl:
            'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
          createdAt: 4365464564646,
          id: 34234,
          duration: 25012,
          title: 'Session 1',
        })}
      />
    </div>
  ))
