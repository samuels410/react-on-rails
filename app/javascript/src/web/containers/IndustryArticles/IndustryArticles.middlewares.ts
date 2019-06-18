import { takeLatest, put, call, cancelled } from 'redux-saga/effects'
import {
  INDUSTRY_ARTICLES_FETCH,
  INDUSTRY_ARTICLES_FETCH_CANCEL,
} from './IndustryArticles.types'
import { cancelable, sleep } from '../../../common/utils'
import {
  fetchIndustryArticlesFailure,
  fetchIndustryArticlesSuccess,
  fetchIndustryArticles,
} from './IndustryArticles.actions'

export async function getIndustryArticlesAPI(signal: AbortSignal) {
  await sleep(2000)
  const responseBody = [
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
  return responseBody
}

function* getIndustryArticlesHandler({
  meta,
}: ReturnType<typeof fetchIndustryArticles>) {
  const abortController = new AbortController()
  try {
    const data = yield call(getIndustryArticlesAPI, abortController.signal)
    yield put(fetchIndustryArticlesSuccess(data, meta))
  } catch (e) {
    yield put(fetchIndustryArticlesFailure(e, meta))
  } finally {
    if (cancelled()) {
      abortController.abort()
    }
  }
}

export function* getIndustryArticlesMiddleware() {
  yield takeLatest(
    INDUSTRY_ARTICLES_FETCH,
    cancelable(getIndustryArticlesHandler, INDUSTRY_ARTICLES_FETCH_CANCEL)
  )
}

export default ([] as any).concat(getIndustryArticlesMiddleware())
