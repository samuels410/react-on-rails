import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, fireEvent } from 'react-testing-library'
import { Provider } from 'react-redux'
import CourseDetails from './CourseDetails'
import store from '../../store'

describe('CourseDetails', () => {
  const courseId = 123
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/courses/${courseId}`]}>
          <Route path="/courses/:courseId" component={CourseDetails} />
        </MemoryRouter>
      </Provider>
    )
  test('Component mounts without any error', () => {
    expect(renderComponent).not.toThrow()
  })

  test('Content tab is selected by default', () => {
    const { container } = renderComponent()
    const element = container.querySelector('button.selected')
    expect(element).toBeTruthy()
    if (element) {
      expect(element.textContent).toMatch(new RegExp('content', 'i'))
    }
  })

  test('Clickin on each tab activates its relevant content', () => {
    const { getByText, container } = renderComponent()
    ;['recordings', 'industry'].forEach(item => {
      const element = getByText(new RegExp(item, 'i'))
      expect(element).toBeTruthy()
      if (element) {
        fireEvent.click(element)
        const selectedElement = container.querySelector('button.selected')
        expect(selectedElement).toBeTruthy()
        if (selectedElement) {
          expect(selectedElement.textContent || '').toMatch(
            new RegExp(item, 'i')
          )
        }
      }
    })
  })
})
