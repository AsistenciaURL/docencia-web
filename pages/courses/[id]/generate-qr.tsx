import { useContext, useState } from 'react'

import { TextField } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import useQR from 'hooks/useQR'
import { SnackbarContext } from 'context/SnackbarProvider'
import LocationPicker from 'components/geo/LocationPicker'
import PrimaryButton from 'components/core/PrimaryButton'
import { useRouter } from 'next/router'

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  return {
    props: { id }
  }
}

const GenerateQR = ({ id }: { id: string }) => {
  const [value, setValue] = useState<Dayjs>(dayjs(new Date().toISOString()))
  const [loading, setLoading] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const [location, setLocation] = useState<any>({
    lat: 14.840616282368563,
    lng: -91.51823879677619
  })

  const router = useRouter()

  const { createQR } = useQR()

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setValue(newValue)
    }
  }

  const generate = async () => {
    setLoading(true)
    const datetime = value.toDate().toISOString()
    console.log(value >= dayjs(new Date()))
    if (location.lat !== undefined && location.lng !== undefined) {
      if (value >= dayjs(new Date())) {
        const response = await createQR(
          id,
          datetime,
          location.lat,
          location.lng
        )
        if (response.status === 'success' && response.data) {
          openSnackbar({
            message: 'QR generado correctamente',
            severity: 'success'
          })
          setLoading(false)
          router.push(`/courses/${id}/${response.data.id}/new`)
        } else {
          openSnackbar({
            message: 'Hubo un error al crear el QR',
            severity: 'error'
          })
        }
      } else {
        openSnackbar({
          message: 'No es posible utilizar un horario pasado',
          severity: 'error'
        })
      }
    }
    setLoading(false)
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-screen flex items-center flex-col justify-center">
          <div className="w-3/5">
            <div className="my-4 flex justify-around items-center">
              <TimePicker
                label="Hora límite de asistencia"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <PrimaryButton
                full={false}
                margin={false}
                label="Edificio Hermano Pedro"
                onClick={() =>
                  setLocation({
                    lat: 14.848653102998583,
                    lng: -91.5240752970689
                  })
                }
              />
              <PrimaryButton
                margin={false}
                full={false}
                label="Edificio URL Central"
                onClick={() =>
                  setLocation({
                    lat: 14.840616282368563,
                    lng: -91.51823879677619
                  })
                }
              />
            </div>
            <LocationPicker
              defaultLocation={location}
              setDefaultLocation={setLocation}
            />
            <div className="w-full flex justify-center my-4">
              <PrimaryButton
                label="Generar QR"
                onClick={() => generate()}
                disabled={loading}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </>
  )
}

export default GenerateQR
