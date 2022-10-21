import { useState } from 'react'

import { Button, TextField } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import QRCode from 'react-qr-code'

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  return {
    props: { id }
  }
}

const GenerateQR = ({ id }: { id: string }) => {
  const [generatedQR, setGeneratedQR] = useState<string | undefined>(undefined)
  const [value, setValue] = useState<Dayjs | null>(
    dayjs(new Date().toISOString())
  )

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setValue(newValue)
      const datetime = newValue.format('YYYY-MM-DD HH:mm:ss')
      const assistanceUrl = id + datetime
      setGeneratedQR(`http://localhost:3000/assistance/${assistanceUrl}`)
    }
  }

  return (
    <div>
      <div>2022-10-20 21:10:21</div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div className="w-screen flex justify-center">
        {generatedQR && <QRCode value={generatedQR} />}
      </div>
    </div>
  )
}

export default GenerateQR
