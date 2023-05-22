import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AppContext);

    const submit = (e) => {
        e.preventDefault();
        let params = {
            email,
            password
        }
        axios.post("http://localhost:8080/api/sessions/login", params)
            .then(res => {
                console.log(res.data);
                if (res.data.status === "success") {
                    setUser(res.data.payload.userResult);
                    document.cookie = `token=${res.data.payload.token}; max-age=${60 * 24}; path=/; samesite=strict`
                }
            })
            .catch(res => {
                console.log(res);
                if (res.response.data.status === 'error') {
                }
            })
    }

    // const test = () => {
    //     const token = document.cookie.replace('token=', '')
    //     axios.post("http://localhost:8080/auth", { token })
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(console.log);
    // }

    return (
        <form className="form form-login" onSubmit={submit}>
            <h2>Iniciar sesión</h2>
            <div>
                <label htmlFor="inputEmail">Ingresa tu email:</label>
                <input type="email" placeholder="Email" id="inputEmail" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="inputPassword">Ingresa tu contraseña:</label>
                <input type="password" placeholder="Contraseña" id="inputPassword" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn formBtn">Iniciar sesión</button>
            <Link to="/register">¿Todavía no estás registrado? Registrate acá.</Link>
        </form>
    )
}

export default Login