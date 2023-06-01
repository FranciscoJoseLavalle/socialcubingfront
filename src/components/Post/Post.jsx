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
                    console.log(res.data);
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
                <button onClick={likePost} className="post__like" style={{
                    backgroundColor: element.interactions.find(el => el === user.id) && "#f83"
                }} disabled={user.name ? false : true}>Me gusta <br /> {element.interactions.length}</button>
                {element.interactions.length > 0 && `Le gustó a ${element.interactions.map(el => " " + el?.first_name)}`}
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