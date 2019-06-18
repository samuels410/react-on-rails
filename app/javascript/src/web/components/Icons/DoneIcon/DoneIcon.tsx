import React from 'react'
import cx from 'classnames'
import { IconProps } from '@material-ui/core/Icon'
import { ReactComponent as Done } from '../../../../common/images/icons/completed.svg'

interface Props extends IconProps {}

const DoneIcon = ({ className }: Props) => <Done className={cx(className)} />

export default DoneIcon
