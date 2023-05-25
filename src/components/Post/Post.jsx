import axios from 'axios';
import moment from 'moment'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Friend from '../Friend/Friend';
import './Post.css';

const Post = ({ element }) => {
    const { user } = useContext(AppContext);

    const likePost = () => {
        axios.put(`socialcubing-production.up.railway.app/api/posts/`, { uid: user.id, pid: element._id })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }
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
                {user.name &&
                    <button onClick={likePost} className="post__like" style={{
                        backgroundColor: element.interactions.find(el => el === user.id) && "#f83"
                    }}>Me gusta</button>
                }
                <small style={{
                    backgroundColor: element.interactions.find(el => el === user.id) && "#f83"
                }}>{element.interactions.length}</small>
            </div>

            <div className='post__date'>
                <small>{moment(parseInt(element.timestamp)).format('DD/MM/YYYY H:mm:ss')}</small>
            </div>
        </div>
    )
}

export default Post