import PrimaryButton from 'components/core/PrimaryButton'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
// import MapPicker from 'react-google-map-picker'
const MapPicker = dynamic(() => import('react-google-map-picker'), {
  ssr: false
})

type Props = {
  setDefaultLocation: (Arg: { lat: number; lng: number }) => void
}

const DefaultZoom = 18

export default function ResponsiveDialog({ setDefaultLocation }: Props) {
  const [location, setLocation] = useState({
    lat: 14.840616282368563,
    lng: -91.51823879677619
  })
  const [newLocation, setNewLocation] = useState<any>({
    lat: 14.840616282368563,
    lng: -91.51823879677619
  })
  const [zoom, setZoom] = useState(DefaultZoom)

  useEffect(() => {
    setDefaultLocation(newLocation)
  }, [newLocation])

  function handleChangeLocation(lat: number, lng: number) {
    setDefaultLocation({ lat, lng })
    setLocation({ lat, lng })
  }

  function handleChangeZoom(newZoom: number) {
    setZoom(newZoom)
  }

  return (
    <>
      <label>Latitute:</label>
      <input type="text" value={location.lat} disabled />
      <label>Longitute:</label>
      <input type="text" value={location.lng} disabled />
      <label>Zoom:</label>
      <input type="text" value={zoom} disabled />

      <PrimaryButton
        label="Edificio Hermano Pedro"
        onClick={() =>
          setNewLocation({ lat: 14.848653102998583, lng: -91.5240752970689 })
        }
      />
      <PrimaryButton
        label="Edificio URL Central"
        onClick={() =>
          setNewLocation({ lat: 14.840616282368563, lng: -91.51823879677619 })
        }
      />
      <MapPicker
        defaultLocation={newLocation}
        zoom={zoom}
        style={{ height: '500px' }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
      />
    </>
  )
}
