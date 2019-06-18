import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from 'react-testing-library'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import MUITheme from '../common/utils/theme'
import Routes from './routes'

describe('Routes', () => {
  const renderComponent = (props: any) =>
    render(
      <MemoryRouter {...props}>
        <ThemeProvider theme={MUITheme}>
          <Routes />
        </ThemeProvider>
      </MemoryRouter>
    )

  test('Component does not throw error on mount', () => {
    expect(renderComponent).not.toThrow()
  })

  test('Goes to 404 page when no route matches', () => {
    const { queryByText } = renderComponent({
      initialEntries: ['/asdfdf'],
    })
    expect(queryByText(new RegExp('404'))).toBeTruthy()
  })

  test('Redirects to dashboard page when user goes to "/" and is logged in', () => {
    const { queryByText } = renderComponent({ initialEntries: ['/'] })
    expect(queryByText(new RegExp('dashboard', 'i'))).toBeTruthy()
  })
})
