import React from 'react'
import { render } from 'react-testing-library'
import App from './App'

describe('App', () => {
  test('Mounts without throwing an error', () => {
    const component = () => render(<App />)
    expect(component).not.toThrow()
  })
})
