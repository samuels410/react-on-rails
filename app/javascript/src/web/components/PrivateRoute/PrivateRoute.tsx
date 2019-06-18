import React from 'react'
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom'
import FallbackHandler from './FallbackHandler'

type ConditionType = (() => Boolean) | Boolean

interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
  condition?: ConditionType
  fallback?: React.ComponentType<any>
}

/**
 *
 * Used to execute the condition passed and retrieve the result
 * whether the route has to be rendered
 */
const checkCondition = (condition: ConditionType) =>
  typeof condition === 'function' ? condition() : condition

/**
 * Render the route only based on some condition and
 * render a fallback component if the condition fails
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  fallback,
  condition = false,
  ...rest
}: PrivateRouteProps) => (
  <Route
    {...rest}
    render={props =>
      checkCondition(condition) ? (
        <Component {...props} />
      ) : (
        <FallbackHandler fallback={fallback} {...props} />
      )
    }
  />
)

PrivateRoute.defaultProps = {
  condition: false,
}

export default PrivateRoute
