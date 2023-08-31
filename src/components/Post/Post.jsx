import axios from 'axios';
import moment from 'moment'
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Comment from '../Comment/Comment';
import Friend from '../Friend/Friend';
import './Post.css';

const Post = ({ element, getPosts }) => {
    const { user, API_URL } = useContext(AppContext);

    const [userName, setUserName] = useState({})
    const [text, setText] = useState('');

    const likePost = () => {
        axios.put(`${API_URL}/api/posts/`, { uid: user.id, pid: element._id })
            .then(res => {
                getPosts();
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {

    }, [])


    const addComment = (e) => {
        e.preventDefault();
        if (user.name) {
            let params = {
                pid: element._id,
                comment: { text, author: user.id, timestamp: Date.now() }
            }
            e.target.reset()
            axios.post(`${API_URL}/api/comments`, params)
                .then(res => {
                    getPosts()
                    if (res.data.status === "success") {
                    }
                })
                .catch(res => {
                    if (res.response.data.status === 'error') {
                    }
                })
        }
    }
    console.log(element.interactions);
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
                {/* <button onClick={likePost} className="post__like" style={{
                    backgroundColor: element.interactions.find(el => el._id === user.id) && "#f33"
                }} disabled={user.name ? false : true}>Me gusta <br /> {element.interactions.length}</button>
                {element.interactions.length > 0 && `Le gustó a ${element.interactions.map(el => " " + el?.first_name)}`} */}
                <svg xmlns="http://www.w3.org/2000/svg" fill={element.interactions.find(el => el._id === user.id) ? "#f33" : "#fff"} viewBox="0 0 24 24"
                    stroke-width={element.interactions.find(el => el._id === user.id) ? "0" : "1px"} stroke="currentColor" width={'2rem'} onClick={likePost}>
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {element.interactions.length <= 2
                    ? element.interactions.length > 0 && `Le gusta a ${element.interactions.map(el => " " + el?.first_name)}`
                    : element.interactions.length > 0 && `Le gusta a ${element.interactions[0].first_name}, ${element.interactions[1].first_name} y ${element.interactions.length - 2} más`
                }
            </div>

            <div className='post__date'>
                <small>{moment(parseInt(element.timestamp)).format('DD/MM/YYYY H:mm:ss')}</small>
            </div>
            {user.name &&
                <div className='post__addComment'>
                    <form onSubmit={addComment}>
                        <input type="text" onChange={(e) => setText(e.target.value)} placeholder="Comentar algo" required />
                        <button>Comentar</button>
                    </form>
                </div>
            }
            {element.comments.length !== 0
                && <div className='post__comments'>
                    <p>Comentarios</p>
                    {element.comments.map(comment =>
                        <Comment key={comment._id} comment={comment} />
                    )}
                </div>
            }


        </div>
    )
}

export default Post