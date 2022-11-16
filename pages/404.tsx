import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NotFoundPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [])

  return <div>e</div>
}

export default NotFoundPage
