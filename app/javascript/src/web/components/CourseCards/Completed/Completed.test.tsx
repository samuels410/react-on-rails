import React from 'react'
import { render } from 'react-testing-library'
import { MemoryRouter } from 'react-router-dom'
import Completed from './Completed'
import { CompletedCourseData } from '../CourseCards.types'
import { getGradeText } from '../../../../common/utils/courses'

describe('CompletedCourseCard', () => {
  const data: CompletedCourseData = {
    course_name: 'Predictive Modeling',
    course_id: 3161,
    start_date: '2019-03-12',
    grade: 'E',
    marks: 20,
    total_marks: 50,
    image_url: 'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
  }

  const renderCard = (d: CompletedCourseData) =>
    render(
      <MemoryRouter>
        <Completed data={d} />
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

  test('Renders grade if grade is provided', () => {
    const { queryByText } = renderCard(data)
    if (data.grade) {
      expect(queryByText(new RegExp(getGradeText(data.grade)))).toBeTruthy()
    }
  })

  test('Does not render grade if grade is not provided', () => {
    const { queryByText } = renderCard({ ...data, grade: undefined })
    expect(queryByText('Marks')).toBeFalsy()
  })
})
