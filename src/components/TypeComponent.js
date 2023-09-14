import { Box, Typography } from '@mui/material'

export const typesForm = {
  appointment: 'appointment',
  break: 'break',
}

const Button = ({ onChange, title, isActive }) => (
  <Typography
    variant="button"
    onClick={onChange}
    sx={{
      borderRadius: 5,
      borderWidth: '2px',
      borderColor: 'grey',
      padding: '10px',
      cursor: 'pointer',
      ...(isActive && {
        borderWidth: 'none',
        borderColor: 'none',
        background: 'blue',
        color: 'white',
      }),
    }}
  >
    {title}
  </Typography>
)

export default function TypeComponent({ onChange, value }) {
  return (
    <Box>
      <Button
        onChange={() => onChange(typesForm.appointment)}
        isActive={value === typesForm.appointment}
        title="Rendez-vous"
      />
      <Button
        onChange={() => onChange(typesForm.break)}
        isActive={value === typesForm.break}
        title="Pause"
      />
    </Box>
  )
}
