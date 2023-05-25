import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import './Search.css';
import Friend from '../Friend/Friend';

const Search = () => {
    const { user } = useContext(AppContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios(`socialcubing-production.up.railway.app/api/user`)
            .then(res => {
                console.log(res.data);
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