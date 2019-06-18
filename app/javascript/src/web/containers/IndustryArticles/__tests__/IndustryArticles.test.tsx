import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { IndustryArticles } from '../IndustryArticles'

describe('IndustryArticles', () => {
  const courseId = 123
  const fetchIndustryArticles = jest.fn()
  const defaultProps = {
    courseId,
    fetchIndustryArticles,
    industryArticlesAPI: undefined,
    industryArticlesData: {},
  }

  const mockData = {
    id: 223,
    url: 'https://www.google.com',
    title: 'How Chatbots and Text Analytics Will Replace Surveys in Education',
    imgUrl:
      'https://video-images.vice.com/articles/58a1d264e93ca05ed18ce76f/lede/1487000254373-3060257995_11deca9ef9_o.jpeg?crop=1xw:0.84375xh%3Bcenter,center&resize=1200:*',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    source: 'Analytics India Magazine',
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterEach(cleanup)

  const renderComponent = (props = {}) =>
    render(<IndustryArticles {...defaultProps} {...props} />)
  test('Component mounts without any error', () => {
    expect(renderComponent).not.toThrow()
  })

  test('fetch request is triggered on mount', () => {
    renderComponent()
    expect(fetchIndustryArticles).toBeCalledTimes(1)
  })

  test('loader is shown after request is triggered', () => {
    const { getByTestId } = renderComponent({
      industryArticlesAPI: { data: [], loading: true, error: false },
    })
    expect(getByTestId('loader')).toBeTruthy()
  })

  test('data is show after request returns successfully', () => {
    const { queryByText, queryByTestId } = renderComponent({
      industryArticlesAPI: { data: [1, 2], loading: false, error: false },
      industryArticlesData: { 1: mockData },
    })
    expect(queryByTestId('loader')).toBeFalsy()
    expect(queryByText(mockData.title)).toBeTruthy()
  })
})
