import { Button } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Default = ({ children }: Props) => {
  return (
    <div>
      <Button>Layout</Button>
      <div>{children}</div>
    </div>
  )
}

export default Default
