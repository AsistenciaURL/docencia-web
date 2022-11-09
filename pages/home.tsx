import type { NextPage } from 'next'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <div>
      <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 ">
          <div className="py-52 px-6">
            <p className="text-5xl text-left text-[#082E71] font-bold  sm:text-7xl">Assist:</p>
            <p className="text-5xl text-left text-[#000000] font-bold  sm:text-7xl">administra tus</p>
            <p className="text-5xl text-left text-[#082E71] font-bold  sm:text-7xl">Asistencias</p>
          </div>
          <div className="py-52 px-6">
            <img  className="max-w-full h-auto" src="" alt="Profesor" />
          </div>
      </div>
    </div>
  )
}

export default Home
