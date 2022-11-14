import { ReactNode, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

type ConfirmDialogProps = {
  confirm: () => void
  text: string
  title: string
  children: ReactNode
  onOpen: () => void
}

export default function ConfirmDialog({
  confirm,
  text,
  title,
  children,
  onOpen
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    onOpen()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    confirm()
    setOpen(false)
  }

  return (
    <div>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SecondaryButton
            label="Cancelar"
            onClick={handleClose}
            full={false}
          />
          <PrimaryButton
            full={false}
            label="Confirmar"
            onClick={handleConfirm}
          />
        </DialogActions>
      </Dialog>
    </div>
  )
}
