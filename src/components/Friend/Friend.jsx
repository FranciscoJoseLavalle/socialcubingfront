import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import './Friend.css';
import userIcon from '../../assets/img/user.webp'

const Friend = ({ friend }) => {
    const { user, addFriend } = useContext(AppContext);

    return (
        <div key={friend._id} className="friend">
            <img src={userIcon} alt="User Icon" width={40} height={40} />
            <Link to={`/profile/${friend._id}`}>{friend.first_name} {friend.last_name}</Link>
            {(user.name && user.id !== friend._id && !user.friends.includes(friend._id)) && <button onClick={() => addFriend(friend._id)}>Añadir amigo</button>}
        </div>
    )
}

export default Friend