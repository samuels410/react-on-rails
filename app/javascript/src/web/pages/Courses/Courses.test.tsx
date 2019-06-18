import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { MemoryRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Courses from './Courses'
import store from '../../store'

describe('Courses - Page', () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Route component={Courses} />
        </MemoryRouter>
      </Provider>
    )
  afterEach(cleanup)

  test('Component mounts without any error', () => {
    renderComponent()
    expect(renderComponent).not.toThrow()
  })
})
