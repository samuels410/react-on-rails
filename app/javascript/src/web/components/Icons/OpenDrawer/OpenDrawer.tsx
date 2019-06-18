import React from 'react'
import cx from 'classnames'
import { IconProps } from '@material-ui/core/Icon'
import styles from './OpenDrawer.module.css'
import { ReactComponent as OpenDrawer } from '../../../../common/images/icons/angleDoubleRight.svg'

interface Props extends IconProps {}

const OpenDrawerIcon = ({ className }: Props) => (
  <div className={cx(styles.container, className)}>
    <OpenDrawer className={styles.openDrawer} />
  </div>
)

export default OpenDrawerIcon
