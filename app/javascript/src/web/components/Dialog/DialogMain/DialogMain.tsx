import React from 'react'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import cx from 'classnames'
import styles from './DialogMain.module.css'

export interface Props extends DialogProps {}

const EnhancedDialogMain = ({ children, className, ...props }: Props) => (
  <Dialog fullWidth className={cx(styles.container, className)} {...props}>
    {children}
  </Dialog>
)

export default EnhancedDialogMain
