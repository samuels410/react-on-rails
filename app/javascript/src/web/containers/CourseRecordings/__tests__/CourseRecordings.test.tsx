import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { MemoryRouter } from 'react-router-dom'
import { CourseRecordings } from '../CourseRecordings'

describe('CourseRecordings', () => {
  const courseId = 123
  const fetchCourseRecordings = jest.fn()
  const defaultProps = {
    courseId,
    fetchCourseRecordings,
    recordingsAPI: undefined,
    recordingsData: {},
  }

  const mockData = {
    authorName: 'Kedar Joshi',
    imageUrl: 'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
    createdAt: 4365464564646,
    id: 34234,
    duration: 25012,
    title: 'Session 1',
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterEach(cleanup)

  const renderComponent = (props = {}) =>
    render(
      <MemoryRouter>
        <CourseRecordings {...defaultProps} {...props} />
      </MemoryRouter>
    )

  test('Component mounts without any error', () => {
    expect(renderComponent).not.toThrow()
  })

  test('fetch request is triggered on mount', () => {
    renderComponent()
    expect(fetchCourseRecordings).toBeCalledTimes(1)
  })

  test('loader is shown after request is triggered', () => {
    const { getByTestId } = renderComponent({
      recordingsAPI: { data: [], loading: true, error: false },
    })
    expect(getByTestId('loader')).toBeTruthy()
  })

  test('data is show after request returns successfully', () => {
    const { queryByText, queryByTestId } = renderComponent({
      recordingsAPI: { data: [1, 2], loading: false, error: false },
      recordingsData: { 1: mockData },
    })
    expect(queryByTestId('loader')).toBeFalsy()
    expect(queryByText(new RegExp(mockData.title))).toBeTruthy()
  })
})
