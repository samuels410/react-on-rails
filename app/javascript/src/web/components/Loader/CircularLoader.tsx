import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { CircularProgressProps } from '@material-ui/core/CircularProgress'
import LoaderBase, { Props as LoaderBaseProps } from './LoaderBase'

export interface Props extends LoaderBaseProps {
  loaderProps?: CircularProgressProps
}

const CircularLoader: React.FC<Props> = ({
  loaderProps = {},
  ...props
}: Props) => {
  return (
    <LoaderBase {...props}>
      <CircularProgress {...loaderProps} />
    </LoaderBase>
  )
}

CircularLoader.defaultProps = {
  style: {},
}

export default CircularLoader
