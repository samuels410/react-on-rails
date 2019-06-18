import React from 'react'
import AppBar from '@material-ui/core/AppBar'

import styles from './HeaderBase.module.css'

interface HeaderBaseProps {
  children: React.ReactNode
}

const HeaderBase = (props: HeaderBaseProps) => {
  return (
    <AppBar className={styles.container} data-testid="header">
      {props.children}
    </AppBar>
  )
}

export default HeaderBase
