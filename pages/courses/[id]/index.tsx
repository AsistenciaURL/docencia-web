import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  return {
    props: { id }
  }
}

const Course = ({ id }: { id: string }) => {
  const router = useRouter()

  return (
    <div>
      <div>{id}</div>
      <Button onClick={() => router.push(`/courses/${id}/generate-qr`)}>
        Generar QR
      </Button>
    </div>
  )
}

export default Course
