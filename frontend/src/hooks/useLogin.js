import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [errorLogin, setErrorLogin] = useState(null)
  const [logginin, setLoggingin] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setLoggingin(true)
    setErrorLogin(null)

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
        setLoggingin(false)
        setErrorLogin(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setLoggingin(false)
    }
  }

  return { login, logginin, errorLogin }
}