import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react'
import SubHeaderItem from './SubHeaderItem'

storiesOf('Courses/CourseItem/SubHeaderItem', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <SubHeaderItem
      itemId={number('Item ID', 1)}
      moduleItem={object('Module Item Object', {
        id: 1,
        title: text('title', 'Introduction to Python'),
        type: 'SubHeader',
      })}
    />
  ))
