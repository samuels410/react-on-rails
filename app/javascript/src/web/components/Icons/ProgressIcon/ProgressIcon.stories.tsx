import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, withKnobs } from '@storybook/addon-knobs'
import ProgressIcon from './ProgressIcon'

storiesOf('Icons/ProgressIcon', module)
  .addDecorator(withKnobs)
  .add('between 0 and 100', () => (
    <ProgressIcon
      value={number('value', 75, { min: 1, max: 99, step: 1, range: false })}
    />
  ))
  .add('No progress', () => <ProgressIcon value={0} />)
  .add('Completed', () => <ProgressIcon value={100} />)
