import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios';

const clientId = '796413127660-tgktohi6gqfm0n183g1kqp6lqehl6ncq.apps.googleusercontent.com';
const LoginGoogle = () => {
    const onSuccess = async(response) => {
        // console.log('bienvenido pue', response.profileObj)
        // setLogged(true)
        console.log('bienvenido pue')
        const objGoogle = {
            ...response.profileObj,
            tokenId: response.tokenId
        }
        console.log('objGoogle', objGoogle)
        //? mandar axios
        try {
            const res = await axios.post('http://localhost:3001/auth/google', objGoogle)
            console.log('res', res.data)
        } catch (error) {
            console.log('error', error)
        }
    }
    const onFailure = (response) => {
        console.log('no sia malo', response)
    }
  return (
    <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        buttonText="Login"
        style={{margin: '0 auto', display: 'block'}}
    />
  )
}

export default LoginGoogle