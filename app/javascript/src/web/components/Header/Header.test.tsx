import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, cleanup } from 'react-testing-library'
import { ThemeProvider } from '@material-ui/styles'
import Header from './Header'
import theme from '../../../common/utils/theme'

afterEach(cleanup)

describe('Header', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    )
  test('component mounts without any error', () => {
    expect(renderComponent).not.toThrow()
  })
})
