import { Button } from '@material-ui/core'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/appSlice'
import { auth, provider } from './firebase'
import './Login.css'

const Login: FC = () => {
    const dispatch = useDispatch()

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then(result => dispatch(login({
            userName: result.user?.displayName,
            profilePic: result.user?.photoURL,
            id: result.user?.uid
        })))
        .catch(err => alert(err))
    }

    return (
        <div className='login'>
            <div className="login-container">
                <img src="https://pbs.twimg.com/profile_images/1324384358418042880/A-ENfuMC_400x400.jpg" alt="snapchat logo"/>
                <Button variant='outlined' onClick={signIn} >Sign In</Button>
            </div>
        </div>
    )
}

export default Login
