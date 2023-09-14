import AutocompleteCustom from './AutocompleteCustom'
import { Phone } from '@mui/icons-material'
import InputMaskCustom from './InputMaskCustom'
import React from 'react'
import { Box } from '@mui/material'

export default function PhoneAutocomplete({
  error,
  helperText,
  addButtonHandler,
  list,
  ...rest
}) {
  const [optionCount, setOptionCount] = React.useState(0)
  const [currentFilter, setCurrentFilter] = React.useState('')

  const filterOptions = (options, state) => {
    const { inputValue } = state
    const transformedValue = inputValue.replaceAll(' ', '').replaceAll('_', '')
    setCurrentFilter(transformedValue)
    const results = options.filter(
      (item) => item?.value.indexOf(transformedValue) !== -1
    )
    if (optionCount !== results.length) {
      setOptionCount(results.length)
    }

    return results
  }
  return (
    <AutocompleteCustom
      addButtonHandler={() =>
        addButtonHandler({
          value: currentFilter,
          name: null,
        })
      }
      list={list}
      helperText={helperText}
      error={error}
      noOptionsText="Numéro non enregistré"
      placeholder="Phone"
      leftIcon={<Phone />}
      inputComponent={InputMaskCustom}
      addButtonText="+ Nouveau client"
      isAddButtonDisabled={optionCount !== 0 || currentFilter?.length !== 12}
      filterOptions={filterOptions}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.value} {option.name && `(${option.name})`}
        </Box>
      )}
      {...rest}
    />
  )
}
