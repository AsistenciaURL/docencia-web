import { ReactNode } from 'react'
import Empty from 'layouts/Empty'
import AssistanceForm from 'components/assistance/AssitanceForm'

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  const permission = true
  return {
    props: { id, permission }
  }
}

const AssistenceSession = ({
  id,
  permission
}: {
  id: string
  permission: boolean
}) => {
  return (
    <div>
      {permission ? (
        <div>
          <AssistanceForm id={id} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

AssistenceSession.layout = function layout(page: ReactNode) {
  return <Empty>{page}</Empty>
}

export default AssistenceSession
