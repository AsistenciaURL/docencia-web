import { createContext, ReactNode, useState } from 'react'
import { AlertColor } from '@mui/material'

type AppContextProps = {
  children: ReactNode
}

type Snackbar = {
  message: string | undefined
  severity: AlertColor
  open?: boolean
}

interface SnackbarContextInterface {
  snackbar: Snackbar
  openSnackbar: (arg0: Snackbar) => void
  closeSnackbar: () => void
}

const defaultState: SnackbarContextInterface = {
  snackbar: {
    message: '',
    severity: 'success',
    open: false
  },
  openSnackbar: function (arg0: Snackbar): void {
    throw new Error('Function not implemented.')
  },
  closeSnackbar: function (): void {
    throw new Error('Function not implemented.')
  }
}

export const SnackbarContext =
  createContext<SnackbarContextInterface>(defaultState)

const SnackbarProvider = ({ children }: AppContextProps) => {
  const [snackbar, setSnackbar] = useState(defaultState.snackbar)

  const openSnackbar = (snackbar: Snackbar) => {
    setSnackbar({
      message: snackbar.message,
      severity: snackbar.severity,
      open: true
    })
  }
  const closeSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    })
  }

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        openSnackbar,
        closeSnackbar
      }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider
