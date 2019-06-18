import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import DialogTitle, { Props } from './DialogTitle'

describe('DialogTitle', () => {
  const onClose = jest.fn()
  const closeButtonSelector = new RegExp('Close', 'i')

  const defaultProps: Props = {
    onClose,
  }

  const renderComponent = (props: Props = defaultProps) =>
    render(<DialogTitle {...props} />)

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Renders onClose button if onClose function is provided', () => {
    const { getByLabelText } = renderComponent()
    expect(getByLabelText(closeButtonSelector)).toBeTruthy()
  })

  test('Clicking onClose button triggers callback', () => {
    const { getByLabelText } = renderComponent()
    const closeButton = getByLabelText(closeButtonSelector)

    expect(onClose).toBeCalledTimes(0)
    fireEvent.click(closeButton)
    expect(onClose).toBeCalledTimes(1)
  })

  test('Does not render onClose button if onClose callback is not provided', () => {
    const { queryByLabelText } = renderComponent({
      ...defaultProps,
      onClose: undefined,
    })
    expect(queryByLabelText(closeButtonSelector)).toBeFalsy()
  })
})
