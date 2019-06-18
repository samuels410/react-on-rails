import React from 'react'
import cx from 'classnames'
import { IconProps } from '@material-ui/core/Icon'
import styles from './CloseDrawer.module.css'
import { ReactComponent as CloseDrawer } from '../../../../common/images/icons/angleDoubleRight.svg'

interface Props extends IconProps {}

const CloseDrawerIcon = ({ className }: Props) => (
  <div className={cx(styles.container, className)}>
    <CloseDrawer className={styles.closeDrawer} />
  </div>
)

export default CloseDrawerIcon
