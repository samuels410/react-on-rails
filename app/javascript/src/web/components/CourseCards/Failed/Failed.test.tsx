import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { MemoryRouter } from 'react-router-dom'
import Failed from './Failed'
import { FailedCourseData } from '../CourseCards.types'

describe('FailedCourseCard', () => {
  const data: FailedCourseData = {
    course_name: 'Predictive Modeling',
    course_id: 3161,
    start_date: '2019-03-12',
    image_url: 'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
  }

  const renderComponent = (d: FailedCourseData = data) =>
    render(
      <body>
        <MemoryRouter>
          <Failed data={d} />
        </MemoryRouter>
      </body>,
      { container: document.body }
    )

  test('should have a course card', () => {
    const { getByText } = renderComponent()
    expect(getByText(data.course_name)).toBeTruthy()
  })

  test('should have an anchor tag that leads to the course page', () => {
    const { container } = renderComponent()
    const coursePageAnchor = container.querySelector(
      `a[href="/courses/${data.course_id}"]`
    )
    expect(coursePageAnchor).toBeTruthy()
  })

  test('able to open re-enroll form', () => {
    const { getByText, container, queryByLabelText } = renderComponent()
    const reEnrollButton = getByText(new RegExp('reenroll', 'i'))

    /** ReEnroll button exists */
    expect(reEnrollButton).toBeTruthy()
    expect(reEnrollButton.parentElement).toBeTruthy()
    if (reEnrollButton && reEnrollButton.parentNode) {
      fireEvent.click(reEnrollButton.parentNode as Element)
    }
    /** ReEnroll form opens */
    expect(container.querySelector('form')).toBeTruthy()

    /** Close ReEnroll button exists */
    const closeReEnrollButton = queryByLabelText('Close')
    expect(closeReEnrollButton).toBeTruthy()

    /** ReEnroll form closes */
    if (closeReEnrollButton) {
      fireEvent.click(closeReEnrollButton)
    }
  })
})
