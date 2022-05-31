import React from 'react'
import { GoogleLogout } from 'react-google-login'

const clientId = `796413127660-tgktohi6gqfm0n183g1kqp6lqehl6ncq.apps.googleusercontent.com`

const LogoutGoogle = () => {
    const onSuccess = (response) => {
        console.log('adios perro')
    }
  return (
    <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                style={{margin: '0 auto', display: 'block'}}
            />
  )
}

export default LogoutGoogle