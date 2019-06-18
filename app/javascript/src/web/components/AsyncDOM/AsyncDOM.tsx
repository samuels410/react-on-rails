import React, { Fragment } from 'react'
import { Loader, ErrorComp, Comp, Content } from './AsyncDOMSubComponents'

type ChildrenTypes =
  | typeof Loader
  | typeof ErrorComp
  | typeof Comp
  | typeof Content

interface Props {
  loading?: boolean
  error?: boolean
  data?: boolean
  children: any[]
}

// const AsyncDOM = (props: Props) => {
//   if (props.children) {
//     return null
//   }
//   const canShowLoader = props.loading === true
//   const canShowError = props.error === true
//   const canShowContent = !!props.data

//   return (
//     <Fragment>
//       {React.Children.map(props.children, child => findType())}
//     </Fragment>
//   )
// }

class AsyncDOM extends React.Component<Props> {
  static Loader = Loader

  static Error = ErrorComp

  static Content = Content

  static Comp = Comp

  canShowLoader = (show?: boolean) => {
    if (typeof show === 'boolean') {
      return show
    }
    return this.props.loading === true
  }

  canShowError = (show?: boolean) => {
    if (typeof show === 'boolean') {
      return show
    }
    return this.props.error === true
  }

  canShowContent = (show?: boolean) => {
    if (typeof show === 'boolean') {
      return show
    }
    return !(this.props.data === false)
  }

  renderChild = (child: React.ReactElement) => {
    if (!child) {
      return null
    }

    if ((child.type as any).name === Loader.name) {
      if (this.canShowLoader(child.props.show)) {
        return <Fragment>{child.props.children}</Fragment>
      }
      return null
    }
    if ((child.type as any).name === ErrorComp.name) {
      if (this.canShowError(child.props.show)) {
        return <Fragment>{child.props.children}</Fragment>
      }
      return null
    }
    if ((child.type as any).name === Content.name) {
      if (this.canShowContent(child.props.show)) {
        return <Fragment>{child.props.children}</Fragment>
      }
    }
    if (child.props.show) {
      return <Fragment>{child.props.children}</Fragment>
    }
    return null
  }

  render() {
    if (!this.props.children) {
      return null
    }
    return (
      <Fragment>
        {React.Children.map(this.props.children, child =>
          this.renderChild(child)
        )}
      </Fragment>
    )
  }
}

export default AsyncDOM
