import {
  Autocomplete,
  TextField,
  InputAdornment,
  Paper,
  Button,
} from '@mui/material'
import React from 'react'

export default function AutocompleteCustom({
  list = [],
  addButtonHandler,
  onChange,
  error,
  helperText,
  noOptionsText,
  placeholder,
  leftIcon,
  inputComponent,
  addButtonText,
  isAddButtonDisabled,
  filterOptions,
  renderOption,
  ...rest
}) {
  const handleChange = (e, value) => {
    onChange(value?.value)
  }

  const handleAddButton = () => {
    addButtonHandler()
  }
  return (
    <Autocomplete
      onChange={handleChange}
      {...rest}
      filterOptions={filterOptions}
      options={list}
      autoHighlight
      disablePortal
      getOptionLabel={(option) => option.value}
      noOptionsText={noOptionsText}
      renderOption={renderOption}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">{leftIcon}</InputAdornment>
              ),
              ...(inputComponent && { inputComponent }),
            }}
          />
        )
      }}
      PaperComponent={({ children }) => {
        return (
          <Paper>
            {children}
            <Button
              color="primary"
              fullWidth
              disabled={isAddButtonDisabled}
              onMouseDown={(event) => {
                event.preventDefault()
                handleAddButton()
              }}
            >
              {addButtonText}
            </Button>
          </Paper>
        )
      }}
    />
  )
}
