import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import Alert from './Alert'

storiesOf('Snackbars/Alert', module)
  .addDecorator(withKnobs)
  .add('Success', () => (
    <Alert
      open
      variant="success"
      message={text('message', 'lorem ipsum dolor sit amet')}
      onClose={action('Alert Closed')}
    />
  ))
  .add('Warning', () => (
    <Alert
      open
      variant="warning"
      message={text('message', 'lorem ipsum dolor sit amet')}
      onClose={action('Alert Closed')}
    />
  ))
  .add('Error', () => (
    <Alert
      open={boolean('open', true)}
      variant="error"
      message={text('message', 'lorem ipsum dolor sit amet')}
      onClose={action('Alert Closed')}
    />
  ))
