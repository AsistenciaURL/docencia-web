import type { NextPage } from 'next'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <div>
      <Button onClick={() => router.push('/courses')}>Ver cursos</Button>
    </div>
  )
}

export default Home
