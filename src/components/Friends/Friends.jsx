import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Friend from '../Friend/Friend';

const Friends = () => {
    let { uid } = useParams();
    const [friends, setFriends] = useState([])

    useEffect(() => {
        axios(`https://socialcubing-production.up.railway.app/api/user/friends/${uid}`)
            .then(res => {
                console.log(res.data)
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