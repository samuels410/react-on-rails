import React from 'react'
import { render } from 'react-testing-library'
import FooterBase from './FooterBase'

describe('FooterBase', () => {
  test('It accepts and displays children', () => {
    const text = 'Hello'
    const { getByText, getByTestId } = render(
      <FooterBase>
        <div data-testid="sample-content">{text}</div>
      </FooterBase>
    )
    expect(getByTestId('sample-content')).toBeDefined()
    expect(getByText(text)).toBeDefined()
  })

  test('It adds its own container element', () => {
    const { getByTestId } = render(
      <FooterBase>
        <div data-testid="sample-content">Hello</div>
        <div data-testid="sample-content">World</div>
      </FooterBase>
    )
    expect(getByTestId('footer')).toBeDefined()
  })
})
