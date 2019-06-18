import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs/react'
import Completed from './Completed'

const completedData = {
  course_name: 'Predictive Modeling',
  course_id: 3161,
  start_date: '2019-03-12',
  desc: 'This is a course on Predictive Modeling',
  image_url: 'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
  marks: 13,
  total_marks: 30,
  progress: 20,
  grade: 'A',
  end_date: '2019-04-12',
}
storiesOf('Courses/CourseCards/Completed', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Completed data={object('data', { ...completedData })} />
  ))
