import React from 'react'
import cx from 'classnames'
import { Button } from '@material-ui/core'
import styles from './ShowMore.module.css'
import Loader, { LoaderProps } from '../Loader'

interface Props {
  content: React.ReactNode
  loading: boolean
  className?: string
  loaderProps?: LoaderProps
  onClick: () => void
}

const ShowMore = ({
  content,
  className,
  loading,
  loaderProps,
  onClick,
}: Props) => (
  <Button
    disabled={loading}
    className={cx(styles.container, className)}
    onClick={onClick}
  >
    {content}
    {loading && <Loader {...loaderProps} />}
  </Button>
)

ShowMore.defaultProps = {
  loading: false,
  content: 'Show More',
  loaderProps: {},
}

export default ShowMore
