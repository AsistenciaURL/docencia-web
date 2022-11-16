import { ReactNode } from 'react'
import Empty from 'layouts/Empty'

const Error = () => {
  return <div>Error</div>
}

Error.layout = function layout(page: ReactNode) {
  return <Empty>{page}</Empty>
}

export default Error
