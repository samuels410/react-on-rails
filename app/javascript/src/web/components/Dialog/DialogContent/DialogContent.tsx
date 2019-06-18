import React from 'react'
import DialogContent, {
  DialogContentProps,
} from '@material-ui/core/DialogContent'
import cx from 'classnames'
import styles from './DialogContent.module.css'

export interface Props extends DialogContentProps {}

const EnhancedDialogContent = ({ children, className, ...props }: Props) => (
  <DialogContent className={cx(styles.container, className)} {...props}>
    {children}
  </DialogContent>
)

export default EnhancedDialogContent
