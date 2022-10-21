import Alert from '@mui/material/Alert'
import MuiSnackbar from '@mui/material/Snackbar'
import { SnackbarContext } from 'context/SnackbarProvider'
import { useContext } from 'react'

export default function Snackbar() {
  const { snackbar, closeSnackbar } = useContext(SnackbarContext)

  const handleClose = () => {
    closeSnackbar()
  }

  return (
    <MuiSnackbar
      autoHideDuration={6000}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      onClose={handleClose}
      open={snackbar.open}
    >
      <Alert
        elevation={6}
        onClose={handleClose}
        severity={snackbar.severity}
        variant="outlined"
      >
        {snackbar.message}
      </Alert>
    </MuiSnackbar>
  )
}
