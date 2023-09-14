import { useReducer } from 'react'

const actions = {
  GET_CONTACTS: 'GET_CONTACTS',
  ADD_CONTACTS: 'ADD_CONTACTS',
  GET_SERVICES: 'GET_SERVICES',
  ADD_SERVICES: 'ADD_SERVICES',
}

const defaultState = {
  contacts: [],
  services: [],
}

const formReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case actions.GET_CONTACTS: {
      return {
        ...state,
        contacts: [
          {
            value: '+41787549856',
            name: 'Alessandro',
          },
          {
            value: '+41787549857',
            name: 'Michael',
          },
        ],
      }
    }
    case actions.ADD_CONTACTS: {
      return {
        ...state,
        contacts: [...state.contacts, payload],
      }
    }
    case actions.GET_SERVICES: {
      return {
        ...state,
        services: [
          {
            value: 'Coupe',
          },
          {
            value: 'Coupe + Barbe',
          },
          {
            value: '',
          },
        ],
      }
    }
    case actions.ADD_SERVICES: {
      return {
        ...state,
        services: [...state.services, payload],
      }
    }
    default:
      throw Error(`Unknown action: ${type}`)
  }
}

const useFormReducer = () => {
  const [state, dispatch] = useReducer(formReducer, defaultState)
  const getContacts = () => {
    dispatch({
      type: actions.GET_CONTACTS,
    })
  }
  const addContact = (payload) => {
    dispatch({
      type: actions.ADD_CONTACTS,
      payload,
    })
  }
  const getServices = () => {
    dispatch({
      type: actions.GET_SERVICES,
    })
  }
  const addService = (payload) => {
    dispatch({
      type: actions.ADD_SERVICES,
      payload,
    })
  }
  return { state, getContacts, addContact, getServices, addService }
}

export default useFormReducer
