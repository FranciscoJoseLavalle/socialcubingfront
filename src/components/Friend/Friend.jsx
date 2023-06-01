import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import './Friend.css';
import userIcon from '../../assets/img/user.webp'
import axios from 'axios';

const Friend = ({ friend }) => {
    const { user, API_URL, friends, getFriends } = useContext(AppContext);

    const addFriend = (fid) => {
        getFriends()
        let params = {
            uid: user.id,
            fid
        }
        axios.post(`${API_URL}/api/user/friends`, params)
            .then(res => {
                if (res.data.status === "success") {
                    getFriends()
                }
            })
            .catch(res => {
                if (res.response.data.status === 'error') {
                }
            })
    }

    return (
        <div className="friend">
            <img src={friend.thumbnail ? friend.thumbnail : userIcon} alt="User Icon" width={40} height={40} />
            <Link to={friend._id ? `/profile/${friend._id}` : `/profile/${friend.id}`}>{friend.first_name} {friend.last_name}</Link>
            {(user.name && user.id !== friend._id && !friends.find(el => friend._id === el._id)) && <button onClick={() => addFriend(friend._id)}>Añadir amigo</button>}
        </div>
    )
}

export default Friend