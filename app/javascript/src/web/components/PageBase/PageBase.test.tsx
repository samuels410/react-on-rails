import React from 'react'
import { render } from 'react-testing-library'
import PageBase from './PageBase'

describe('PageBase', () => {
  test('It accepts and displays children', () => {
    const text = 'Hello'
    const { getByText, getByTestId } = render(
      <PageBase>
        <div data-testid="sample-content">{text}</div>
      </PageBase>
    )
    expect(getByTestId('sample-content')).toBeDefined()
    expect(getByText(text)).toBeDefined()
  })

  test('It adds its own container element', () => {
    const { getByTestId } = render(
      <PageBase>
        <div data-testid="sample-content">Hello</div>
        <div data-testid="sample-content">World</div>
      </PageBase>
    )
    expect(getByTestId('page-content')).toBeDefined()
  })
})
