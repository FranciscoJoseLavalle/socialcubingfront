import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Post from '../Post/Post';
import './HomePosts.css';

const HomePosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios(`http://localhost:8080/api/posts`)
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