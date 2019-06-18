import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'

interface FallbackHandlerProps extends RouteComponentProps {
  fallback?: React.ComponentType<any>
}

const FallbackHandlerProps = ({
  fallback: FallbackComponent,
  ...props
}: FallbackHandlerProps) =>
  FallbackComponent !== undefined ? (
    <FallbackComponent />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: props.location },
      }}
    />
  )

export default FallbackHandlerProps
