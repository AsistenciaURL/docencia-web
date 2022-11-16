import type { NextPage } from 'next'
import Image from 'next/image'
import profilePic from '../public/home.png'

const Home: NextPage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 ">
        <div className="py-52 px-6">
          <p className="text-5xl text-left text-[#082E71] font-bold  sm:text-7xl">
            Assist:
          </p>
          <p className="text-5xl text-left text-[#000000] font-bold  sm:text-7xl">
            administra tus
          </p>
          <p className="text-5xl text-left text-[#082E71] font-bold  sm:text-7xl">
            Asistencias
          </p>
        </div>
        <div className="grid place-items-center">
          <Image
            src={profilePic}
            alt="Picture of the author"
            width={450}
            height={450}
            quality={100}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
      </div>
    </div>
  )
}

export default Home
