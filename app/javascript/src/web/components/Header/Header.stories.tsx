import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Header from './Header'

const actions = {
  onHelpClick: action('onHelpClick'),
  onNotificationsClick: action('onNotificationsClick'),
}
storiesOf('Header', module).add('default', () => <Header {...actions} />)
