import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Post from '../Post/Post';
import './HomePosts.css';

const HomePosts = () => {
    const { API_URL } = useContext(AppContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios(`${API_URL}/api/posts`)
            .then(res => {
                setPosts(res.data.payload);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='home_posts'>
            {posts.toSorted((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)).map(post =>
                <div key={post._id}>
                    <Post element={post} />
                </div>
            )}
        </div>
    )
}

export default HomePosts