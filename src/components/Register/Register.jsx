import axios from 'axios'
import React, { useState } from 'react'
import { Link, redirect } from 'react-router-dom';

import './Register.css'

const Register = () => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formSubmit = (e) => {
        e.preventDefault();
        let params = {
            first_name,
            last_name,
            password,
            email
        }
        axios.post("socialcubing-production.up.railway.app/api/sessions/register", params, {
            "headers": {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res.data);
                // setLoading(false);
                if (res.data.status === "success") {
                    redirect('/login')
                    // window.location.replace("/")
                }
            })
            .catch(res => {
                console.log(res);
                if (res.response.data.status === 'error') {
                    // setLoading(false);
                    // setUserExist(true);
                    // setFirst_name('')
                    // setLast_name('')
                    // setEmail('')
                    // setPassword('')
                }
            })
    }


    return (
        <form className="form form-register" onSubmit={formSubmit}>
            <h2>Registrarse</h2>
            <div>
                <label htmlFor="inputUsername">Ingresa tu nombre</label>
                <input type="text" placeholder="Nombre" id="inputUsername" required onChange={(e) => setFirst_name(e.target.value)} />
            </div>
            <div>
                <label htmlFor="inputUsername">Ingresa tu apellido</label>
                <input type="text" placeholder="Apellido" id="inputUsername" required onChange={(e) => setLast_name(e.target.value)} />
            </div>
            <div>
                <label htmlFor="inputEmail">Ingresa tu email</label>
                <input type="email" placeholder="Email" id="inputEmail" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="inputPassword">Ingresa tu contraseña</label>
                <input type="password" placeholder="Contraseña" id="inputPassword" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn formBtn ">Registrarse</button>
            <Link to="/login">¿Ya tenés cuenta? Iniciá sesión.</Link>
        </form>
    )
}

export default Register