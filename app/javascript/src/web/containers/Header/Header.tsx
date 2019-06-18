import React from 'react'
import { Toolbar } from '@material-ui/core'
import HeaderBase from '../../components/HeaderBase'
import HeaderComponent from '../../components/Header'
import ProfileMenu from './ProfileMenu/ProfileMenu'
import styles from './Header.module.css'

const Header = () => {
  return (
    <HeaderBase>
      <div className={styles.container}>
        <Toolbar className={styles.toolbar}>
          <HeaderComponent />
          <ProfileMenu />
        </Toolbar>
      </div>
    </HeaderBase>
  )
}

export default Header
