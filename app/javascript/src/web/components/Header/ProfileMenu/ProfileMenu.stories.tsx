import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ProfileMenu from './ProfileMenu'

const actions = {
  onProfileClick: action('onProfileClick'),
}

const initialData = {
  userDetails: {
    id: 1,
    name: 'Loren Epsum',
    imageUrl:
      'https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?cs=srgb&dl=animal-chihuahua-cute-39317.jpg&fm=jpg',
    loginId: 'string',
  },
}

storiesOf('ProfileMenu', module).add('default', () => (
  <ProfileMenu {...initialData} {...actions} />
))
