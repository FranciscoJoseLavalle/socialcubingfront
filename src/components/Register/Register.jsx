import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import useTitle from '../../customHooks/useTitle'

import './Register.css'

const Register = () => {
    const { API_URL } = useContext(AppContext)
    useTitle('Registrarse')
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [isError, setIsError] = useState(false);

    const [seePassword, setSeePassword] = useState(false)

    const submit = (e) => {
        e.preventDefault();
        const a = validarCampo(email, document.querySelector('#email'))
        const b = validarCampo(password, document.querySelector('#password'))
        const c = validarCampo(first_name, document.querySelector('#first_name'))
        const d = validarCampo(last_name, document.querySelector('#last_name'))

        if (a && b && c && d) {
            auth();
        }
    }

    const auth = () => {
        let params = {
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            password: password.trim(),
            email: email.trim()
        }
        axios.post(`${API_URL}/api/sessions/register`, params, {
            "headers": {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                // setLoading(false);
                if (res.data.status === "success") {
                    setIsError(false);
                    setRegistered(true);
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

    if (registered) {
        return <Navigate to='/login' />
    }
    return (
        <form className="form form-register" onSubmit={submit}>
            <h2>Registrarse</h2>
            {isError && <p>El usuario con el email {email} ya existe.</p>}
            <div>
                <label htmlFor="first_name">Ingresa tu nombre</label>
                <input type="text" placeholder="Nombre" id="first_name" onChange={(e) => setFirst_name(e.target.value)} />
            </div>
            <div>
                <label htmlFor="last_name">Ingresa tu apellido</label>
                <input type="text" placeholder="Apellido" id="last_name" onChange={(e) => setLast_name(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Ingresa tu email</label>
                <input type="email" placeholder="Email" id="email" onChange={(e) => {
                    setEmail(e.target.value)
                    setIsError(false);
                }} />
            </div>
            <div>
                <label htmlFor="password">Ingresa tu contraseña</label>
                <input type={seePassword ? "text" : "password"} placeholder="Contraseña" id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='seePasswordContainer'>
                <label htmlFor="seePassword">Ver contraseña</label>
                <input type="checkbox" id='seePassword' onChange={() => setSeePassword(!seePassword)} />
            </div>
            <button className="btn formBtn">Registrarse</button>
            <Link to="/login">¿Ya tenés cuenta? Iniciá sesión.</Link>
        </form>
    )
}

export default Register