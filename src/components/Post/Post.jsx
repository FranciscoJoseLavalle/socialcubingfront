import axios from 'axios';
import moment from 'moment'
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Friend from '../Friend/Friend';
import './Post.css';

const Post = ({ element, getPosts }) => {
    const { user, API_URL } = useContext(AppContext);

    const [text, setText] = useState('');

    const likePost = () => {
        axios.put(`${API_URL}/api/posts/`, { uid: user.id, pid: element._id })
            .then(res => {
                getPosts();
            })
            .catch(err => console.log(err))
    }

    const addComment = (e) => {
        e.preventDefault();
        if (user.name) {
            let params = {
                pid: element._id,
                comment: { text, author: user.id, timestamp: Date.now() }
            }
            axios.post(`${API_URL}/api/comments`, params)
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === "success") {
                    }
                })
                .catch(res => {
                    if (res.response.data.status === 'error') {
                    }
                })
        }
    }

    console.log(element);
    return (
        <div className='post'>
            {/* <Link to={element?.author?.first_name ? `/profile/${element?.author._id}` : '#'}>
                <b>{userActual?.first_name} {userActual?.last_name}</b>
                <b>{element?.author?.first_name} {element?.author?.last_name}</b>
            </Link> */}
            <Friend friend={element.author} />
            <div className='post__content'>
                <p>{element.text}</p>
                {element.media && <img src={element.media} width={'100%'} />}
            </div>
            <div className='post__interactions'>
                {/* {user.name && */}
                <button onClick={likePost} className="post__like" style={{
                    backgroundColor: element.interactions.find(el => el === user.id) && "#f83"
                }} disabled={user.name ? false : true}>Me gusta <br /> {element.interactions.length}</button>
                {/* } */}
                {/* <small style={{
                    backgroundColor: element.interactions.find(el => el === user.id) && "#f83"
                }}>Me gusta: </small> */}
            </div>

            <div className='post__date'>
                <small>{moment(parseInt(element.timestamp)).format('DD/MM/YYYY H:mm:ss')}</small>
            </div>
            {user.name &&
                <div>
                    <form onSubmit={addComment}>
                        <input type="text" onChange={(e) => setText(e.target.value)} />
                        <button>Comentar</button>
                    </form>
                </div>
            }
            <div>
                {element.comments.map(comment => <p>{comment.text}</p>)}
            </div>

        </div>
    )
}

export default Post