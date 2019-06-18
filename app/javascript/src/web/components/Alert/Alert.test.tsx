import React from 'react'
import { render, fireEvent, prettyDOM } from 'react-testing-library'
import Alert, { Props } from './Alert'
import { sleep } from '../../../common/utils'

describe('Alert Snackbar', () => {
  const onClose = jest.fn()
  const defaultProps = {
    open: true,
    onClose,
    variant: 'success' as 'success',
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  const renderComponent = (props: Props) => render(<Alert {...props} />)

  test('Mounts without error', () => {
    const props = {
      ...defaultProps,
    }
    expect(() => renderComponent(props)).not.toThrow()
  })

  test('Alert message is displayed', () => {
    const message = 'Action Successful'
    const props = {
      ...defaultProps,
      message,
    }
    const { queryByText } = renderComponent(props)
    expect(queryByText(new RegExp(message))).toBeTruthy()
  })

  test('onClose callback is called when close button is clicked', () => {
    const message = 'Action Successful'
    const props = {
      ...defaultProps,
      message,
    }
    const { getByLabelText } = renderComponent(props)
    fireEvent.click(getByLabelText(new RegExp('Close', 'i')))
    expect(onClose).toBeCalledTimes(1)
  })

  test('able to open and close alert message', async () => {
    const message = 'Hello World'
    const props = {
      ...defaultProps,
      message,
      open: false,
    }
    const { queryByText, rerender } = renderComponent(props)
    expect(queryByText(new RegExp(message))).toBeFalsy()

    rerender(<Alert {...props} open />)
    expect(queryByText(new RegExp(message))).toBeTruthy()

    rerender(<Alert {...props} open={false} />)
    await sleep(1000)
    expect(queryByText(new RegExp(message))).toBeFalsy()
  })
})
