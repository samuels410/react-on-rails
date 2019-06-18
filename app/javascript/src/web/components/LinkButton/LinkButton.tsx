import React from 'react'
import Button, { ButtonProps } from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'

interface LinkButtonProps extends ButtonProps {
  to: string
  replace?: boolean
  activeClassName?: string
}

const LinkButton = (props: LinkButtonProps) => (
  <Button {...props} component={NavLink as any} />
)

export default LinkButton
