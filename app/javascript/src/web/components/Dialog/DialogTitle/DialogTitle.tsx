import React from 'react'
import DialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import cx from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import styles from './DialogTitle.module.css'

export interface Props extends DialogTitleProps {
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const EnhancedDialogTitle = ({ children, className, ...props }: Props) => (
  <DialogTitle className={cx(styles.container, className)} {...props}>
    <div className={styles.header}>
      <div className={styles.title}>{children}</div>
      {props.onClose ? (
        <div className={styles.closeContainer}>
          <IconButton
            aria-label="Close"
            className={styles.closeIcon}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      ) : null}
    </div>
  </DialogTitle>
)

EnhancedDialogTitle.defaultProps = {}

export default EnhancedDialogTitle
