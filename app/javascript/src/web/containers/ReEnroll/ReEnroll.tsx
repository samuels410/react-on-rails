import React from 'react'
import ReEnrollForm, { ReEnrollFormProps } from '../../components/ReEnrollForm'

export interface Props extends ReEnrollFormProps {}

const ReEnroll = ({ open, onClose, onFormSubmit }: Props) => (
  <ReEnrollForm open={open} onClose={onClose} onFormSubmit={onFormSubmit} />
)

ReEnroll.defaultProps = {
  open: false,
  onClose: () => '',
  onFormSubmit: () => '',
}

export default ReEnroll
