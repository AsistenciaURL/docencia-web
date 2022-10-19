import { Checkbox as MuiCheckbox } from '@mui/material'
import { Controller } from 'react-hook-form'

type InputProps = {
  control: any
  name: string
  defaultValue?: boolean
}

const Checkbox = ({ name, control, defaultValue = false }: InputProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => <MuiCheckbox {...field} />}
    />
  )
}

export default Checkbox
