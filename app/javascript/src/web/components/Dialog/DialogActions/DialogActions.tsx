import React from 'react'
import DialogActions, {
  DialogActionsProps,
} from '@material-ui/core/DialogActions'
import cx from 'classnames'
import styles from './DialogActions.module.css'

export interface Props extends DialogActionsProps {}

const EnhancedDialogActions = ({ children, className, ...props }: Props) => (
  <DialogActions className={cx(styles.container, className)} {...props}>
    {children}
  </DialogActions>
)

export default EnhancedDialogActions
