import axios from 'axios';
import moment from 'moment'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import './Post.css';

const Post = ({ element, userActual }) => {
    const { user } = useContext(AppContext);

    const likePost = () => {
        axios.put(`http://localhost:8080/api/posts/`, { uid: user.id, pid: element._id })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }
    // console.log(element);
    return (
        <div className='post'>
            <Link to={element?.author?.first_name ? `/profile/${element?.author._id}` : '#'}>
                <b>{userActual?.first_name} {userActual?.last_name}</b>
                <b>{element?.author?.first_name} {element?.author?.last_name}</b>
            </Link>
            <div>
                {element.text}
            </div>
            <div>
                <button onClick={likePost}>Me gusta</button> {element.interactions.length}
            </div>
            <div>
                <small>{moment(parseInt(element.timestamp)).format('DD/MM/YYYY H:mm:ss')}</small>
            </div>
        </div>
    )
}

export default Post