import React from 'react'
import { render } from 'react-testing-library'
import HeaderBase from './HeaderBase'

describe('HeaderBase', () => {
  test('It accepts and displays children', () => {
    const text = 'Hello'
    const { getByText, getByTestId } = render(
      <HeaderBase>
        <div data-testid="sample-content">{text}</div>
      </HeaderBase>
    )
    expect(getByTestId('sample-content')).toBeDefined()
    expect(getByText(text)).toBeDefined()
  })

  test('It adds its own container element', () => {
    const { getByTestId } = render(
      <HeaderBase>
        <div data-testid="sample-content">Hello</div>
        <div data-testid="sample-content">World</div>
      </HeaderBase>
    )
    expect(getByTestId('header')).toBeDefined()
  })
})
