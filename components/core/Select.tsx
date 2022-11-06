import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect
} from '@mui/material'
import { ComponentProps, ReactNode } from 'react'
import { Controller, FieldError } from 'react-hook-form'

type InputProps = {
  label: string
  control: any
  error?: FieldError
  name: string
  defaultValue?: string
  type?: ComponentProps<typeof MuiSelect>['type']
  children: ReactNode
}

const Select = ({
  name,
  control,
  label,
  defaultValue = '',
  error,
  type,
  children
}: InputProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth sx={{ pb: error ? 1.1 : 4 }}>
          <InputLabel id="select-label">{label}</InputLabel>
          <MuiSelect
            type={type}
            labelId="select-label"
            id="select"
            label={label}
            error={error !== undefined}
            {...field}
          >
            {children}
          </MuiSelect>
          <FormHelperText error={error !== undefined}>
            {error && error.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default Select
