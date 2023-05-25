import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Friend from '../Friend/Friend';

const Friends = () => {
    const { API_URL } = useContext(AppContext);
    let { uid } = useParams();
    const [friends, setFriends] = useState([])

    useEffect(() => {
        axios(`${API_URL}/api/user/friends/${uid}`)
            .then(res => {
                setFriends(res.data.payload);
            })
            .catch(err => console.log(err))
    }, [])

    if (friends.length === 0) {
        return (
            <p style={{
                textAlign: "center"
            }}>No tienes amigos aún...</p>
        )
    }
    return (
        <div>
            {friends.map(friend => <Friend key={friend._id} friend={friend} />)}
        </div>
    )
}

export default Friends