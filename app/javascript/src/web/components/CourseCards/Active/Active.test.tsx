import React from 'react'
import { render } from 'react-testing-library'
import { MemoryRouter } from 'react-router-dom'
import Active from './Active'
import { ActiveCourseData } from '../CourseCards.types'

describe('ActiveCourseCard', () => {
  const data: ActiveCourseData = {
    course_name: 'Predictive Modeling',
    course_id: 3161,
    start_date: '2019-03-12',
    image_url: 'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
  }

  const renderCard = (d: ActiveCourseData) =>
    render(
      <MemoryRouter>
        <Active data={d} />
      </MemoryRouter>
    )

  test('should have a course card', () => {
    const { getByText } = renderCard(data)
    expect(getByText(data.course_name)).toBeTruthy()
  })

  test('should have an anchor tag that leads to the course page', () => {
    const { container } = renderCard(data)
    const coursePageAnchor = container.querySelector(
      `a[href="/courses/${data.course_id}"]`
    )
    expect(coursePageAnchor).toBeTruthy()
  })

  test('Does not render progress bar if there is no value for progress', () => {
    const { queryByText } = renderCard(data)
    expect(queryByText(new RegExp('\\d+%'))).toBeFalsy()
  })

  test('Renders progress bar if there is value for progress', () => {
    const { queryByText } = renderCard({ ...data, progress: 75 })
    expect(queryByText('75%')).toBeTruthy()
  })

  test('Renders marks if there is marks', () => {
    const { queryByText } = renderCard({
      ...data,
      marks: 75,
      total_marks: 100,
    })
    expect(queryByText(new RegExp('75/100'))).toBeTruthy()
  })

  test('Does not render marks section if marks is not available', () => {
    const { queryByText } = renderCard(data)
    expect(queryByText(new RegExp('--/--'))).toBeTruthy()
  })
})
