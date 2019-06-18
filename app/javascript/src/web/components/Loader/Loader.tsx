import React from 'react'

import CircularLoader, { Props as CircularLoaderProps } from './CircularLoader'

type LoaderTypes = 'circle' | ''

export type Props = {
  style: object
  type: LoaderTypes
} & CircularLoaderProps

const Loader = ({ type, ...props }: Props) => {
  switch (type) {
    case 'circle':
      return <CircularLoader {...props} />
    default:
      return <CircularLoader {...props} />
  }
}

Loader.defaultProps = {
  type: '',
  style: {},
}

export default Loader
