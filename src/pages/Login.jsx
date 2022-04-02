import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const signIn = event => {
        event.preventDefault()

        axios.post('http://localhost:1337/api/auth/local', {
            identifier: username,
            password,
        })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('token', JSON.stringify(res.data.jwt))
                navigate('/')
            })
            .catch(err => console.error(err))
    }

    return (
        <div className='section'>
            <Link to='/'>
                <button className="button is-danger m-5">Back to main page</button>
            </Link>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5">
                        <div className="box">
                            <div className="title has-text-centered">Login</div>
                            <form className='form' onSubmit={event => signIn(event)}>
                                <label htmlFor="name" className='label'>Enter username</label>
                                <input
                                    type="text"
                                    className='input'
                                    onInput={event => setUsername(event.target.value)}
                                    value={username}
                                    id='name' />
                                <label htmlFor="password" className='label'>Enter password</label>
                                <input
                                    type="password"
                                    className='input'
                                    onInput={event => setPassword(event.target.value)}
                                    value={password}
                                    id='password' />
                                <button
                                    className="button is-fullwidth is-success my-2"
                                    type='submit'>
                                    Submit
                                </button>
                                <div className="has-text-centered">
                                    <p>Don't have an account?</p>
                                    <Link to='/register'>
                                        Move to register page
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
