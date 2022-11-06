import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

type Props = {
  id: string
  name: string
  email: string
}

const StudentListItem = ({ name, email, id }: Props) => {
  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={name}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {id}
              </Typography>
              {` — ${email}`}
            </>
          }
        />
      </ListItem>
    </List>
  )
}

export default StudentListItem
