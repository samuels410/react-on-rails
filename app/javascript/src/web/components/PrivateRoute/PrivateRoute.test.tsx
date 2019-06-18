import React from 'react'
import { render } from 'react-testing-library'
import { BrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PageNotFound from '../PageNotFoundContent'

describe('PrivateRoute', () => {
  test('Able to render a route when condition is true', () => {
    const SampleComponent = () => <div>Hello World</div>
    const { getByText } = render(
      <BrowserRouter>
        <PrivateRoute component={SampleComponent} condition />
      </BrowserRouter>
    )
    expect(getByText(/Hello/)).toBeDefined()
  })

  test('Renders fallback component page when condition is false', () => {
    const SampleComponent = () => <div>Hello World</div>
    const { getByText } = render(
      <BrowserRouter>
        <PrivateRoute component={SampleComponent} fallback={PageNotFound} />
      </BrowserRouter>
    )
    expect(getByText(/Page not found/i)).toBeDefined()
  })
})
