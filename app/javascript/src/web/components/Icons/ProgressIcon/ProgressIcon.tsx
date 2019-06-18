import React from 'react'
import { CircularProgress } from '@material-ui/core'
import cx from 'classnames'
import DoneIcon from '../DoneIcon'
import styles from './ProgressIcon.module.css'

interface Props {
  className?: string
  value: number
  size?: number
}

const ProgressIcon = (props: Props) => {
  return props.value === 100 ? (
    <DoneIcon className={cx(props.className)} />
  ) : (
    <CircularProgress
      className={cx(styles.progressIcon)}
      classes={{ svg: props.className }}
      variant="static"
      value={props.value}
      size={props.size}
    />
  )
}

export default ProgressIcon
