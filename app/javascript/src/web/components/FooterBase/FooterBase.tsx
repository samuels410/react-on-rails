import React from 'react'
import styles from './FooterBase.module.css'

interface FooterBase {
  children: React.ReactNode
}

const FooterBase = (props: FooterBase) => (
  <footer className={styles.container} data-testid="footer">
    {props.children}
  </footer>
)

export default FooterBase
