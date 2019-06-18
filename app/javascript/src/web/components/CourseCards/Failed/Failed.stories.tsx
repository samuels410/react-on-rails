import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs/react'
import Failed from './Failed'

const actions = {
  onReenrollClick: action('onReenrollClick'),
}

const failedData = {
  course_name: 'Predictive Modeling',
  course_id: 3161,
  start_date: '2019-03-12',
  desc: 'This is a course on Predictive Modeling',
  image_url: 'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
  grade: 'IC',
  marks: 13,
  total_marks: 30,
}

storiesOf('Courses/CourseCards/Failed', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Failed data={object('data', { ...failedData })} {...actions} />
  ))
