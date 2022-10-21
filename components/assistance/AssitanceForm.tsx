import { useState } from 'react'

import { Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { HookResponse } from 'hooks/types'
import Input from 'components/core/Input'
import useAssistance from 'hooks/useAssistance'

type FormValues = {
  carnet: string
}

const schema = yup.object().shape({
  carnet: yup.string().required()
})

const AssistanceForm = ({ id }: { id: string }) => {
  const [success, setSuccess] = useState(false)
  const { createAssistance } = useAssistance()

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormValues) => {
    const response: HookResponse = await createAssistance(data.carnet, id)
    if (response.status === 'success') {
      setSuccess(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} label="Carnet" name="carnet" />
        <Button type="submit">Enviar Asistencia</Button>
        {success && <Typography>ASISTENCIA ENVIADA CORRECTAMENTE</Typography>}
      </form>
    </>
  )
}

export default AssistanceForm
