import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Friend from '../Friend/Friend';
import './Comment.css';

const Comment = ({ comment }) => {
    const { API_URL } = useContext(AppContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios(`${API_URL}/api/user/${comment.author}`)
            .then(res => {
                setUser(res.data.payload);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='comment'>
            <Friend friend={user} />
            {/* {user.first_name} */}
            <p>{comment.text}</p>
            <small>{moment(parseInt(comment.timestamp)).format('DD/MM/YYYY H:mm:ss')}</small>
        </div>
    )
}

export default Comment