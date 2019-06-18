import React from 'react'
import { render } from 'react-testing-library'
import { MemoryRouter } from 'react-router-dom'
import { Courses, Props } from '../Courses'

describe('Courses', () => {
  const fetchCourseListMock = jest.fn()
  const programId = 154
  const defaultProps: Props = {
    fetchCourseList: fetchCourseListMock,
    courses: {
      data: { byId: {} },
      byProgram: {},
      byCourse: {},
    },
    classes: {},
  }

  const renderComponent = (props: Props) =>
    render(
      <MemoryRouter>
        <Courses {...props} />
      </MemoryRouter>
    )

  test('Fires a fetch action on mount', () => {
    const { container } = render(<Courses {...defaultProps} />)
    expect(container).toBeDefined()
    expect(fetchCourseListMock).toHaveBeenCalledTimes(1)
  })

  test('Should show loader after API call is fired', () => {
    const { getByTestId } = render(
      <Courses
        {...defaultProps}
        courses={{
          data: { byId: {} },
          byProgram: { [programId]: { data: [], loading: true, error: false } },
          byCourse: {},
        }}
      />
    )
    expect(getByTestId('loader')).toBeDefined()
  })

  test('Renders null when no data is available', () => {
    const { queryByText } = renderComponent({
      ...defaultProps,
      courses: {
        data: { byId: {} },
        byProgram: { [programId]: { data: [], loading: false, error: false } },
        byCourse: {},
      },
    })

    expect(queryByText('Active Courses')).toBeFalsy()
    expect(queryByText('Completed Courses')).toBeFalsy()
    expect(queryByText('Failed Courses')).toBeFalsy()
    expect(queryByText('Upcoming Courses')).toBeFalsy()
  })

  test('Renders active courses if active courses data is available', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      courses: {
        data: {
          byId: {
            3161: {
              course_name: 'Predictive Modeling',
              course_id: 3161,
              start_date: '2019-03-12',
              image_url:
                'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
            },
          },
          activeIds: [3161],
          completedIds: [3161],
          failedIds: [3161],
          upcomingIds: [3161],
        },
        byProgram: {
          [programId]: { data: [3161], loading: true, error: false },
        },
        byCourse: {},
      },
    })

    expect(getByText('Active Courses')).toBeTruthy()
    expect(getByText('Completed Courses')).toBeTruthy()
    expect(getByText('Failed Courses')).toBeTruthy()
    expect(getByText('Upcoming Courses')).toBeTruthy()
  })
})
