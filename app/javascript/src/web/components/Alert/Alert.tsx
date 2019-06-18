import React from 'react'
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import cx from 'classnames'
import styles from './Alert.module.css'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

export interface Props extends SnackbarProps {
  className?: string
  variant: keyof typeof variantIcon
  onClose: () => void
}

const Alert = (props: Props) => {
  const { message, onClose, variant, className, ...others } = props
  const Icon = variantIcon[variant]

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={onClose}
      {...others}
    >
      <SnackbarContent
        aria-describedby="client-snackbar"
        className={cx(styles.alertContent, styles[variant], className)}
        message={
          <span id="client-snackbar" className={styles.messageContainer}>
            <Icon className={cx(styles.messageIcon, styles.iconVariant)} />
            <div className={styles.message}>{message}</div>
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={styles.closeIcon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}

Alert.defaultProps = {
  className: '',
  autoHideDuration: 5000,
}

export default Alert
