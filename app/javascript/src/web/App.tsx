import React from 'react'
import CSSBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, StylesProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import Routes from './routes'
import MUITheme from '../common/utils/theme'
import './App.module.css'
import {
  getCSSString,
  convertToCSSVariablesFormat,
} from '../common/utils/styles'
import { flatten } from '../common/utils'
import theme from './styles/theme'
import colors from './styles/colors'
import Header from './containers/Header'
import Footer from './components/Footer'
import PageBase from './components/PageBase'

function appendCSSVariables() {
  const style = document.createElement('style')
  const StyleVariables = flatten({ ...colors, ...theme }, '', '-')
  const CSSVariables = convertToCSSVariablesFormat(StyleVariables, '-')
  const CSSString = getCSSString(':root', CSSVariables)
  style.innerHTML = CSSString
  document.head.appendChild(style)
}

appendCSSVariables()

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={MUITheme}>
          <CSSBaseline />
          <BrowserRouter>
            <Header />
            <PageBase>
              <Routes />
            </PageBase>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  </React.StrictMode>
)

export default App
