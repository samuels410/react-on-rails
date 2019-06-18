import React from 'react'
import { render } from 'react-testing-library'
import Loader from './Loader'

describe('Loader', () => {
  test('Renders a default styled loader when no prop "type" is passed', () => {
    const { getByTestId } = render(<Loader />)
    expect(getByTestId('loader')).toBeTruthy()
  })
})
