import React from 'react'
import { Container } from '@material-ui/core'
import styles from './PageBase.module.css'

interface PageBase {
  children: React.ReactNode
}

const PageBase = (props: PageBase) => (
  <Container
    component="main"
    maxWidth="lg"
    className={styles.container}
    data-testid="page-content"
  >
    {props.children}
  </Container>
)

export default PageBase
