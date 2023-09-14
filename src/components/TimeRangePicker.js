import { TimePicker } from '@mui/x-date-pickers'
import { ArrowRightAlt } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { red } from '@mui/material/colors'

export default function TimeRangePicker({ onChange, value, error }) {
  const handleChangeStart = (valueIn) => {
    onChange({
      start: valueIn,
      end: value?.end,
    })
  }
  const handleChangeEnd = (valueIn) => {
    onChange({
      start: valueIn?.start,
      end: valueIn,
    })
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TimePicker
          sx={{ width: '45%' }}
          onChange={handleChangeStart}
          value={value?.start}
        />
        <ArrowRightAlt />
        <TimePicker
          error
          value={value?.end}
          onChange={handleChangeEnd}
          sx={{ width: '45%' }}
        />
      </Box>
      {error && (
        <Typography
          variant="button"
          onClick={onChange}
          sx={{
            color: red['500'],
            marginTop: '20px',
            display: 'block',
          }}
        >
          {error}
        </Typography>
      )}
    </>
  )
}
