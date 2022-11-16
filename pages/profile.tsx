import type { NextPage } from 'next'
import Image from 'next/image'
import profilePic from '../public/perfil.png'
import { Card, CardContent } from '@mui/material'
import { useContext, useEffect } from 'react'
import { SessionContext } from 'context/AuthProvider'
import useProfessors from 'hooks/useProfessors'

const Profile: NextPage = () => {
  const { session } = useContext(SessionContext)
  const { getProfessor, professor } = useProfessors()
  useEffect(() => {
    if (session.uid) {
      getProfessor(session.uid)
    }
  }, [session])
  return (
    <div>
      <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
        <div className="grid place-items-center h-screen">
          <Image
            src={profilePic}
            alt="Picture of the author"
            width={400}
            height={300}
            quality={100}
          />
        </div>
        <div className="grid place-items-center h-screen ">
          <Card className="max-w-sm min-w-[50%]">
            <CardContent>
              <p className="text-xl font-semibold">Nombre:</p>
              <p className="pb-4 text-[#082E71] font-semibold">
                {professor.name}
              </p>
              <p className="text-xl font-semibold">Carnet:</p>
              <p className="pb-4 text-[#082E71] font-semibold">
                {professor.carnet}
              </p>
              <p className="text-xl font-semibold ">Correo:</p>
              <p className="pb-4 text-[#082E71] font-semibold">
                {professor.email}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
