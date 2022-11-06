import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'firebase/auth'
import { auth } from 'services/Firebase'
import type { NextPage } from 'next'

const Navbar = () => {
  const router = useRouter()
  const logOut = async () => {
    await signOut(auth)
    router.push('/sign-in')
  }
  return (
    <div className="flex justify-between w-100% h-[44px] bg-[#093073] md:pr-14">
      <div className="flex justify-start md:justify-start">
        <button
          className="text-white h-full px-6 font-semibold hover:bg-[#0b357e]"
          onClick={() => router.push('/home')}
        >
          Inicio
        </button>
        <button
          className="text-white hover:bg-[#0b357e] h-full px-6 font-semibold"
          onClick={() => router.push('/courses')}
        >
          Cursos
        </button>
        <button
          className="text-white hover:bg-[#0b357e] h-full px-6 font-semibold"
          onClick={() => router.push('/courses')}
        >
          Perfil
        </button>
      </div>
      <div className="flex justify-end">
        <button
          className="text-white justify-end hover:bg-[#0b357e] h-full px-6 font-semibold"
          onClick={() => logOut()}
        >
          Salir
        </button>
      </div>
    </div>
  )
}
export default Navbar
