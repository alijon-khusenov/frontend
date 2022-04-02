import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export default function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const navigate = useNavigate()

    const register = event => {
        event.preventDefault()

        if (password === password2) {
            axios.post('http://localhost:1337/api/users',
                { username, email, password, confirmed: true })
                .then(() => navigate('/login'))
                .catch(err => console.error(err))
        } else {
            throw Error('Password do not match!')
        }
    }
    return (
        <div className="section">
            <Link to='/'>
                <button className="button is-danger m-5">Back to main page</button>
            </Link>
            <div className="container">
                <div className="columns is-centered mt-6">
                    <div className="column is-5">
                        <div className="box">
                            <div className="title has-text-centered">Register</div>
                            <form className='form' onSubmit={event => register(event)}>
                                <label htmlFor="username">Enter username</label>
                                <input
                                    type="text"
                                    id='username'
                                    className='input'
                                    onInput={event => setUsername(event.target.value)}
                                    value={username}
                                />
                                <label htmlFor="email">Enter email</label>
                                <input
                                    type="email"
                                    id='email'
                                    className='input'
                                    onInput={event => setEmail(event.target.value)}
                                    value={email}
                                />
                                <label htmlFor="password">Enter password</label>
                                <input
                                    type="password"
                                    id='password'
                                    className='input'
                                    onInput={event => setPassword(event.target.value)}
                                    value={password}
                                />
                                <label htmlFor="passwordConfirm">Confirm password</label>
                                <input
                                    type="password"
                                    id='passwordConfirm'
                                    className='input'
                                    onInput={event => setPassword2(event.target.value)}
                                    value={password2}
                                />
                                <div className="has-text-centered">
                                    <p>
                                        Already have an account?
                                    </p>
                                    <Link to='/login'>
                                        Move to login!
                                    </Link>
                                </div>
                                <button
                                    className="button is-fullwidth is-success my-2"
                                    type='submit'>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}