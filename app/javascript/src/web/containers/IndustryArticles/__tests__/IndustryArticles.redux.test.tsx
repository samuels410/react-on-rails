import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import {
  getIndustryArticlesMiddleware,
  getIndustryArticlesAPI,
} from '../IndustryArticles.middlewares'
import getIndustryArticlesReducer from '../IndustryArticles.reducer'
import {
  fetchIndustryArticles,
  fetchIndustryArticlesCancel,
} from '../IndustryArticles.actions'

describe('Courses/Redux', () => {
  const mockData = [
    {
      id: 223,
      url: 'https://www.google.com',
      title:
        'How Chatbots and Text Analytics Will Replace Surveys in Education',
      imgUrl:
        'https://video-images.vice.com/articles/58a1d264e93ca05ed18ce76f/lede/1487000254373-3060257995_11deca9ef9_o.jpeg?crop=1xw:0.84375xh%3Bcenter,center&resize=1200:*',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      source: 'Analytics India Magazine',
    },
    {
      id: 224,
      url: 'https://www.google.com',
      imgUrl:
        'https://www.socialmediatoday.com/user_media/cache/19/d8/19d8c4a8f0ae82789225a2b52a5706a8.jpg',
      title:
        'Facebook Announces News Feed Update to Crack Down on "Engagement Baiting" Posts | Social Media Today',
      desc:
        "Facebook's announced a new News Feed algorithm update which will crack down on posts that ask users to react, tag and share to boost reach.",
      source: 'Analytics India Magazine',
    },
    {
      id: 225,
      url: 'https://www.google.com',
      title:
        'How Chatbots and Text Analytics Will Replace Surveys in Education',
      imgUrl:
        'https://video-images.vice.com/articles/58a1d264e93ca05ed18ce76f/lede/1487000254373-3060257995_11deca9ef9_o.jpeg?crop=1xw:0.84375xh%3Bcenter,center&resize=1200:*',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      source: 'Analytics India Magazine',
    },
    {
      id: 227,
      url: 'https://www.google.com',
      title:
        'How Chatbots and Text Analytics Will Replace Surveys in Education',
      imgUrl:
        'https://www.socialmediatoday.com/user_media/cache/19/d8/19d8c4a8f0ae82789225a2b52a5706a8.jpg',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      source: 'Analytics India Magazine',
    },
    {
      id: 228,
      url: 'https://www.google.com',
      imgUrl:
        'https://video-images.vice.com/articles/58a1d264e93ca05ed18ce76f/lede/1487000254373-3060257995_11deca9ef9_o.jpeg?crop=1xw:0.84375xh%3Bcenter,center&resize=1200:*',
      title:
        'How Chatbots and Text Analytics Will Replace Surveys in Education',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      source: 'Analytics India Magazine',
    },
  ]

  test('Fetches industry articles data successfully', async () => {
    const { storeState } = await expectSaga(getIndustryArticlesMiddleware)
      .withReducer(getIndustryArticlesReducer as any)
      .provide([[matchers.call.fn(getIndustryArticlesAPI), mockData]])
      .dispatch(fetchIndustryArticles({ courseId: 12 }, { courseId: 12 }))
      .run()

    expect(storeState).toMatchObject({
      data: {
        byId: {
          223: expect.any(Object),
          224: expect.any(Object),
          225: expect.any(Object),
          227: expect.any(Object),
          228: expect.any(Object),
        },
      },
      byCourse: {
        12: { data: [223, 224, 225, 227, 228], loading: false, error: false },
      },
    })
  })

  test('Able to handle any error', async () => {
    const error = new Error('error')
    const { storeState } = await expectSaga(getIndustryArticlesMiddleware)
      .withReducer(getIndustryArticlesReducer as any)
      .provide([[matchers.call.fn(getIndustryArticlesAPI), throwError(error)]])
      .dispatch(fetchIndustryArticles({ courseId: 12 }, { courseId: 12 }))
      .run()

    expect(storeState).toMatchObject({
      byCourse: { 12: { loading: false, error } },
    })
  })

  test('Dispatching cancel action resets state to initial state', async () => {
    const { storeState } = await expectSaga(getIndustryArticlesMiddleware)
      .withReducer(getIndustryArticlesReducer as any)
      .dispatch(fetchIndustryArticles({ courseId: 12 }, { courseId: 12 }))
      .dispatch(fetchIndustryArticlesCancel({ courseId: 12 }, { courseId: 12 }))
      .run()

    expect(storeState).toMatchObject({
      byCourse: { 12: { loading: false } },
    })
  })
})
