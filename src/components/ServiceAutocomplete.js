import AutocompleteCustom from './AutocompleteCustom'
import { BookmarkBorder } from '@mui/icons-material'
import React from 'react'
import { Box } from '@mui/material'

export default function ServiceAutocomplete({
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
    setCurrentFilter(inputValue)
    const results = options.filter(
      (item) => item?.value.indexOf(inputValue) !== -1
    )
    if (optionCount !== results.length) {
      setOptionCount(results.length)
    }

    return results
  }

  return (
    <AutocompleteCustom
      {...rest}
      addButtonHandler={() =>
        addButtonHandler({
          value: currentFilter,
        })
      }
      list={list}
      helperText={helperText}
      error={error}
      noOptionsText="Service non trouvé"
      placeholder="Selectionner un service"
      leftIcon={<BookmarkBorder />}
      addButtonText="+ Ajouter"
      isAddButtonDisabled={optionCount !== 0}
      filterOptions={filterOptions}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.value}
        </Box>
      )}
    />
  )
}
