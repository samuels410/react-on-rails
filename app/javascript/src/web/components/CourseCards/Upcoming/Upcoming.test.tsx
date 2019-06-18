import React from 'react'
import { render, fireEvent, prettyDOM } from 'react-testing-library'
import { MemoryRouter } from 'react-router-dom'
import Upcoming from './Upcoming'
import { UpcomingCourseData } from '../CourseCards.types'
import { readableDate, sleep } from '../../../../common/utils'

describe('UpcomingCourseCard', () => {
  const data: UpcomingCourseData = {
    course_name: 'Predictive Modeling',
    course_id: 3161,
    start_date: '2019-03-12',
    image_url: 'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
  }

  const renderComponent = (d: UpcomingCourseData = data) =>
    render(
      <MemoryRouter>
        <Upcoming data={d} />
      </MemoryRouter>
    )

  test('should have a course card', () => {
    const { getByText } = renderComponent(data)
    expect(getByText(data.course_name)).toBeTruthy()
  })

  test('should render available from date if date is available', () => {
    const { queryByText } = renderComponent()
    expect(queryByText(new RegExp('Available from', 'i'))).toBeTruthy()
    expect(
      queryByText(new RegExp(readableDate(data.start_date || '2019-03-12')))
    ).toBeTruthy()
  })

  test('should not render available from date if date is not available', () => {
    const { queryByText } = renderComponent({ ...data, start_date: '' })
    expect(queryByText(new RegExp('Available from', 'i'))).toBeFalsy()
  })

  test('able to open and close alert on clicking the card', async () => {
    const { queryByRole, container, getByLabelText } = renderComponent()
    expect(queryByRole('alertdialog')).toBeFalsy()

    const element = container.querySelector('.cardLink')
    expect(element).toBeTruthy()
    if (element) {
      fireEvent.click(element)
    }
    expect(queryByRole('alertdialog')).toBeTruthy()

    fireEvent.click(getByLabelText(new RegExp('Close', 'i')))
    await sleep(1000)
    expect(queryByRole('alertdialog')).toBeFalsy()
  })
})
