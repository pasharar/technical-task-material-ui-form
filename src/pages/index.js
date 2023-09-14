import * as React from 'react'
import dayjs from 'dayjs'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AccountCircle, FormatAlignLeft } from '@mui/icons-material'

import {
  Layout,
  TypeComponent,
  PhoneAutocomplete,
  ServiceAutocomplete,
  TimeRangePicker,
  typesForm,
} from '@/components'

import useFormReducer from '@/reducers/useFormReducer'
import { dateFormat, validationSchema } from '@/constants'

React.useLayoutEffect = React.useEffect

const fiveAM = dayjs().set('hour', 5).startOf('hour')
const nineAM = dayjs().set('hour', 9).startOf('hour')

export default function Index() {
  const [isDisabledName, setIsDisabledName] = React.useState(false)

  const {
    state: { contacts, services },
    getContacts,
    addContact,
    getServices,
    addService,
  } = useFormReducer()

  React.useEffect(() => {
    getContacts()
    getServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      type: typesForm.appointment,
      time: { start: fiveAM, end: nineAM },
    },
  })
  const changedFormName = useWatch({ control, name: 'contact' })

  React.useEffect(() => {
    const currentContact = contacts.filter(
      (item) => item.value === changedFormName
    )
    if (currentContact && currentContact[0]?.name) {
      setValue('name', currentContact[0]?.name)
      setIsDisabledName(true)
    } else {
      setValue('name', '')
      setIsDisabledName(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedFormName])

  const onSubmitHandler = (values) => {
    const { contact, name, type, service } = values
    const preparedData = {
      contact,
      name,
      type,
      service,
      ...(values.date && { date: dayjs(values.date).format(dateFormat) }),
      ...(values.time && {
        time: {
          start: dayjs(values.time.start).format('HH:mm:ss'),
          end: dayjs(values.time.end).format('HH:mm:ss'),
        },
      }),
    }
    alert(JSON.stringify(preparedData, null, 2))
    console.log('Submitted data', values, preparedData)
  }

  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" component="h1">
          Nouveau rendez-vous
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{ width: '20rem', justifyContent: 'center' }}
        >
          <Box sx={{ marginTop: '30px' }}>
            <Controller
              control={control}
              name="type"
              render={({ field }) => <TypeComponent {...field} />}
            />
          </Box>

          <Box sx={{ marginTop: '20px' }}>
            <Controller
              control={control}
              name="contact"
              render={({ field, fieldState: { error } }) => (
                <PhoneAutocomplete
                  {...field}
                  addButtonHandler={addContact}
                  list={contacts}
                  helperText={error ? error.message : ''}
                  error={!!error}
                />
              )}
            />
          </Box>

          <Box sx={{ marginTop: '10px' }}>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextField
                    {...field}
                    placeholder="Prenom"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                      readOnly: isDisabledName,
                    }}
                  />
                )
              }}
            />
          </Box>
          <Box sx={{ marginTop: '10px' }}>
            <Controller
              control={control}
              name="service"
              render={({ field, fieldState: { error } }) => (
                <ServiceAutocomplete
                  {...field}
                  addButtonHandler={addService}
                  list={services}
                  helperText={error ? error.message : ''}
                  error={!!error}
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: '10px' }}>
            <Controller
              control={control}
              name="date"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DesktopDatePicker
                  error={!!error}
                  helperText={error ? error.message : ''}
                  onChange={(value) =>
                    onChange(dayjs(value).format(dateFormat))
                  }
                  value={value}
                  sx={{ width: '100%' }}
                  format={dateFormat}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      error: !!error,
                      helperText: error ? error.message : '',
                    },
                  }}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              marginTop: '10px',
            }}
          >
            <Controller
              control={control}
              name="time"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TimeRangePicker
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: '10px' }}>
            <Controller
              control={control}
              name="comment"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  placeholder="Ajouter un commentaire"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FormatAlignLeft />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: '10px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" disabled={false} type="submit">
                Confirmer
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}
