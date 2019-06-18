import React from 'react'

interface LoaderProps {
  show?: boolean
  children: React.ReactNode
}
const Loader = (props: LoaderProps) => <div>{props}</div>

interface ErrorCompProps {
  show?: boolean
  children: React.ReactNode
}
const ErrorComp = (props: ErrorCompProps) => <div>{props}</div>

interface ContentProps {
  show?: boolean
  children: React.ReactNode
}
const Content = (props: ContentProps) => <div>{props}</div>

interface CompProps {
  show: boolean
  children: React.ReactNode
}
const Comp = (props: CompProps) => <div>{props}</div>

export { Loader, ErrorComp, Content, Comp }
