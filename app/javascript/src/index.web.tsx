import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './web/App'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

ReactDOM.render(<App />, document.getElementById('root'))
