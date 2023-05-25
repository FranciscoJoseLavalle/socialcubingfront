import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import './Search.css';
import Friend from '../Friend/Friend';
import useTitle from '../../customHooks/useTitle'

const Search = () => {
    const { user, API_URL } = useContext(AppContext);
    useTitle('Buscar amigos')
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios(`${API_URL}/api/user`)
            .then(res => {
                setUsers(res.data.payload);
            })
    }, [])

    return (
        <main className='searchUsers'>
            <h2>Encontrar usuarios</h2>
            <div className='searchusers__container'>
                {users.map(userSearched => <Friend key={userSearched._id} friend={userSearched} />)}
            </div>
        </main>
    )
}

export default Search