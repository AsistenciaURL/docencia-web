import { useContext, useState } from 'react'

import { Button, TextField } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import QRCode from 'react-qr-code'
import useQR from 'hooks/useQR'
import { useGeolocated } from 'react-geolocated'
import { SnackbarContext } from 'context/SnackbarProvider'

export async function getServerSideProps({ query }: { query: { id: number } }) {
  const { id } = query
  return {
    props: { id }
  }
}

const GenerateQR = ({ id }: { id: number }) => {
  const [generatedQR, setGeneratedQR] = useState<string | undefined>(undefined)
  const [show, setShow] = useState(false)
  const [value, setValue] = useState<Dayjs>(dayjs(new Date().toISOString()))
  const { openSnackbar } = useContext(SnackbarContext)

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  })

  const { createQR } = useQR()

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      console.log(newValue.format('YYYY-MM-DD HH:mm:ss'))
      setValue(newValue)
      // const datetime = newValue.format('YYYY-MM-DD HH:mm:ss')
      // const assistanceUrl = id + datetime
      // setGeneratedQR(`http://localhost:3000/assistance/${assistanceUrl}`)
    }
  }

  const generate = async () => {
    const datetime = value.format('YYYY-MM-DD HH:mm:ss')

    console.log(value >= dayjs(new Date()))
    if (coords !== undefined) {
      if (value >= dayjs(new Date())) {
        setShow(true)
        const response = await createQR(
          id,
          datetime,
          coords.latitude,
          coords.longitude
        )
        if (response.status === 'success' && response.data) {
          setGeneratedQR(`http://localhost:3000/assistance/${response.data.id}`)
          openSnackbar({
            message: 'QR generado correctamente',
            severity: 'success'
          })
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
    } else {
      openSnackbar({
        message:
          'La localización esta actualmente desactivada, actívela y recargue la página',
        severity: 'error'
      })
    }
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div className="w-screen flex justify-center">
        <Button onClick={() => generate()}>Generar QR</Button>
        {show && generatedQR && <QRCode value={generatedQR} />}
      </div>
    </>
  )
}

export default GenerateQR
