import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
// import MapPicker from 'react-google-map-picker'
const MapPicker = dynamic(() => import('react-google-map-picker'), {
  ssr: false
})

type Props = {
  setDefaultLocation: (Arg: { lat: number; lng: number }) => void
  defaultLocation: { lat: number; lng: number }
}

const DefaultZoom = 18

export default function ResponsiveDialog({
  setDefaultLocation,
  defaultLocation
}: Props) {
  const [location, setLocation] = useState({
    lat: 14.840616282368563,
    lng: -91.51823879677619
  })

  const [zoom, setZoom] = useState(DefaultZoom)
  console.log(location)

  useEffect(() => {
    setDefaultLocation(defaultLocation)
  }, [defaultLocation])

  function handleChangeLocation(lat: number, lng: number) {
    setDefaultLocation({ lat, lng })
    setLocation({ lat, lng })
  }

  function handleChangeZoom(newZoom: number) {
    setZoom(newZoom)
  }

  return (
    <>
      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        style={{ height: '500px' }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
      />
    </>
  )
}
