import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import FallbackHandler from './FallbackHandler'

describe('FallbackHandler', () => {
  afterEach(cleanup)

  test('Renders the fallback component if provided', () => {
    const Comp = () => <div>Unauthorized</div>
    const { getByText } = render(
      <Router>
        <Route
          render={props => <FallbackHandler {...props} fallback={Comp} />}
        />
      </Router>
    )

    expect(getByText(/Unauthorized/i)).toBeDefined()
  })

  test('Redirects to login page by default', () => {
    const Login = () => <div>Login</div>
    const { getByText } = render(
      <Router initialEntries={['/target']}>
        <Route path="/login" component={Login} />
        <Route
          path="/target"
          render={props => <FallbackHandler {...props} />}
        />
      </Router>
    )

    expect(getByText(/Login/i)).toBeDefined()
  })
})
