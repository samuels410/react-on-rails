import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from 'react-testing-library'
import ReEnroll, { Props } from './ReEnroll'

describe('ReEnroll', () => {
  const renderComponent = (props: Props) =>
    render(
      <MemoryRouter>
        <ReEnroll {...props} />
      </MemoryRouter>
    )

  test('component mounts successfully without any errors', () => {
    expect(renderComponent).not.toThrow()
  })
})
