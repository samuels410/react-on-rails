import React, { useState, Fragment } from 'react'
import { Typography } from '@material-ui/core'
import cx from 'classnames'
import styles from './ReadMore.module.css'

interface Props {
  clipOnly: boolean
  limit: number
  readMoreText: string
  readLessText: string
  children: string
  className?: string
}

const ReadMore = (props: Props) => {
  if (props.children.length <= props.limit) {
    return <Fragment>{props.children}</Fragment>
  }

  const [isOpen, setOpen] = useState(false)
  return (
    <Fragment>
      {isOpen
        ? props.children
        : `${props.children.substring(0, props.limit)}... `}
      <Typography
        component="span"
        color="primary"
        className={cx(styles.cta, props.className)}
        onClick={() => setOpen(status => !status)}
      >
        {isOpen ? props.readLessText : props.readMoreText}
      </Typography>
    </Fragment>
  )
}

ReadMore.defaultProps = {
  clipOnly: false,
  readMoreText: 'Read More',
  readLessText: 'Read Less',
}

export default ReadMore
