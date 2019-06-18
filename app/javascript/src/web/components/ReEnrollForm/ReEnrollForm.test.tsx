import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import ReEnrollForm, { Props } from './ReEnrollForm'

describe('ReEnrollForm', () => {
  const onCloseMock = jest.fn()
  const onFormSubmitMock = jest.fn()

  const defaultProps: Props = {
    open: true,
    onClose: onCloseMock,
    onFormSubmit: onFormSubmitMock,
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  const renderComponent = ({
    open = true,
    onClose = onCloseMock,
    onFormSubmit = onFormSubmitMock,
  }: Props = defaultProps) =>
    render(
      <ReEnrollForm
        open={open}
        onClose={onClose}
        onFormSubmit={onFormSubmit}
      />,
      {
        container: document.body,
      }
    )

  test('Able to close form with close(x) button', () => {
    const { queryByLabelText } = renderComponent()

    expect(onCloseMock).toBeCalledTimes(0)

    const closeButton = queryByLabelText('Close')
    expect(closeButton).toBeTruthy()

    if (closeButton) {
      fireEvent.click(closeButton)
    }
    expect(onCloseMock).toBeCalledTimes(1)
  })

  test('Able to close form with cancel button', () => {
    const { queryByText } = renderComponent()

    expect(onCloseMock).toBeCalledTimes(0)
    const closeButton = queryByText(new RegExp('Cancel', 'i'))
    expect(closeButton).toBeTruthy()

    if (closeButton && closeButton.parentNode) {
      fireEvent.click(closeButton)
    }
    expect(onCloseMock).toBeCalledTimes(1)
  })

  test('Able to fill form values', () => {
    const { getByLabelText, getByText } = renderComponent()

    const reasonValue = 'Other'
    const commentsValue = 'Test Comment'
    const reasonInput = getByLabelText(new RegExp('other', 'i'))
    const commentsInput = getByLabelText(new RegExp('comments', 'i'))

    fireEvent.click(reasonInput)
    expect((reasonInput as HTMLInputElement).value).toEqual(reasonValue)

    fireEvent.change(commentsInput, {
      target: { value: commentsValue },
    })
    expect((commentsInput as HTMLTextAreaElement).value).toEqual(commentsValue)

    const submitButton = getByText(new RegExp('submit', 'i')).parentNode
    expect(submitButton).toBeTruthy()
    if (submitButton) {
      fireEvent.click(submitButton as Element)
    }

    expect(onFormSubmitMock).toBeCalledTimes(1)
    expect(onFormSubmitMock).toBeCalledWith({
      reason: reasonValue,
      comments: commentsValue,
    })
  })
})
