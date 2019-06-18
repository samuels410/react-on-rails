import React from 'react'
import { storiesOf } from '@storybook/react'
import IndustryArticle from './IndustryArticle'

storiesOf('Courses/IndustryArticle', module).add('default', () => (
  <IndustryArticle
    data={{
      id: 223,
      url: 'https://www.google.com',
      title:
        'How Chatbots and Text Analytics Will Replace Surveys in Education',
      imgUrl:
        'https://video-images.vice.com/articles/58a1d264e93ca05ed18ce76f/lede/1487000254373-3060257995_11deca9ef9_o.jpeg?crop=1xw:0.84375xh%3Bcenter,center&resize=1200:*',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      source: 'Analytics India Magazine',
    }}
  />
))
