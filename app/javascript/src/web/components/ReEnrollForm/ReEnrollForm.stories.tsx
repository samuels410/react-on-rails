import React from 'react'
import { storiesOf } from '@storybook/react'
import ReEnroll from './ReEnrollForm'

const props = {
  onClose: () => null,
  onFormSubmit: () => '',
  open: true,
}

storiesOf('ReEnroll', module)
  .add('default', () => <ReEnroll {...props} />)
  .add('with option selected', () => (
    <ReEnroll {...props} reason="I was travelling, so I couldn't spend time" />
  ))
  .add('with comments', () => (
    <ReEnroll {...props} comments="Please reenroll" />
  ))
