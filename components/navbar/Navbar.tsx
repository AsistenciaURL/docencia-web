import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

const Navbar = () => {
  const router = useRouter()
  return (
    <div className="flex justify-center md:justify-end w-100% h-[44px] bg-[#093073] md:pr-14">
      <button
        className="text-white h-full px-6 font-semibold hover:bg-[#0b357e]"
        onClick={() => router.push('/courses')}
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
  )
}
export default Navbar
