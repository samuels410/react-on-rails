import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs/react'
import Upcoming from './Upcoming'

const upcomingData = {
  course_name: 'Predictive Modeling',
  course_id: 3161,
  start_date: '2019-03-12',
  desc: 'This is a course on Predictive Modeling',
  image_url: 'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
}
storiesOf('Courses/CourseCards/Upcoming', module)
  .addDecorator(withKnobs)
  .add('default', () => <Upcoming data={object('data', { ...upcomingData })} />)
