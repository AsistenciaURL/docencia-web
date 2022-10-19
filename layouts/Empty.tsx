import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const Empty = ({ children }: Props) => {
  return <div>{children}</div>
}

export default Empty
