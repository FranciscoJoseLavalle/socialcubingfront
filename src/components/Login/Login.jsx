import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import useTitle from '../../customHooks/useTitle'

import './Login.css';

const Login = () => {
    const { user, setUser, API_URL } = useContext(AppContext);
    useTitle("Iniciar sesión")

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        const a = validarCampo(email, document.querySelector('#email'))
        const b = validarCampo(password, document.querySelector('#password'))
        if (a && b) {
            auth();
        }
    }


    const auth = () => {
        let params = {
            email,
            password
        }
        axios.post(`${API_URL}/api/sessions/login`, params)
            .then(res => {
                if (res.data.status === "success") {
                    setUser(res.data.payload.userResult);
                    setIsError(false);
                    document.cookie = `token=${res.data.payload.token}; max-age=${60 * 24}; path=/; samesite=strict`
                }
            })
            .catch(res => {
                if (res.response.data.status === 'error') {
                    setIsError(true);
                }
            })
    }

    const validarCampo = (campo, input) => {
        if (/^\s/.test(campo) || campo === '') {
            input.classList.add('inputWrong');
            return false
        } else {
            input.classList.remove('inputWrong');
            return true
        }
    }
    if (user.name) {
        return <Navigate to="/" />
    }
    return (
        <form className="form form-login" onSubmit={submit}>
            <h2>Iniciar sesión</h2>
            {isError &&
                <div>
                    <p>Algún dato ingresado es incorrecto.</p>
                </div>
            }
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="example@gmail.com" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" placeholder="*******" id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn formBtn">Iniciar sesión</button>
            <Link to="/register">¿Todavía no estás registrado? Registrate acá.</Link>
        </form>
    )
}

export default Login