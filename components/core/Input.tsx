import { TextField } from '@mui/material'
import { ComponentProps } from 'react'
import { Controller, FieldError } from 'react-hook-form'

type InputProps = {
  label: string
  control: any
  error?: FieldError
  name: string
  defaultValue?: string
  type?: ComponentProps<typeof TextField>['type']
}

const Input = ({
  name,
  control,
  label,
  defaultValue = '',
  error,
  type
}: InputProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <TextField
          fullWidth
          type={type}
          label={label}
          {...field}
          sx={{ pb: error ? 1.1 : 4 }}
          error={error !== undefined}
          helperText={error && error.message}
        />
      )}
    />
  )
}

export default Input
