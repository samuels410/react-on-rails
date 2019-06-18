import React from 'react'
import cx from 'classnames'
import styles from './LoaderBase.module.css'

export interface Props {
  children?: React.ReactChild
  style: object
  className?: string
}

const LoaderBase: React.FC<Props> = (props: Props) => (
  <div
    style={props.style}
    className={cx(styles.loader, props.className)}
    data-testid="loader"
  >
    {props.children}
  </div>
)

LoaderBase.defaultProps = {
  style: {},
}

export default LoaderBase
