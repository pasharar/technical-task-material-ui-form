import * as React from 'react'
import { Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function Layout({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          height: 'auto',
          pt: '100px',
          pb: '20px',
        }}
      >
        {children}
      </Box>
    </LocalizationProvider>
  )
}
