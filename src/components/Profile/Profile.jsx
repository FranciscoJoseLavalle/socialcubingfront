import axios from 'axios';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import foto from '../../assets/img/user.webp'
import { AppContext } from '../../context/AppContext';

import './Profile.css';
import ProfileSections from '../ProfileSections/ProfileSections';

const Profile = () => {
    const { user } = useContext(AppContext);
    let { uid } = useParams();
    const [userActual, setUserActual] = useState({});
    const [postText, setPostText] = useState('');
    const [posts, setPosts] = useState([]);
    const [actualPage, setActualPage] = useState('Publicaciones')

    useEffect(() => {
        getUser();
    }, [uid])

    const uploadPost = (e) => {
        e.preventDefault();
        console.log(userActual);
        let post = {
            text: postText,
            timestamp: Date.now(),
            author: userActual._id,
        }
        let params = {
            uid: userActual._id,
            post
        }
        axios.post("http://localhost:8080/api/user/post", params)
            .then(res => {
                console.log(res.data);
                if (res.data.status === "success") {
                    getUser();
                }
            })
            .catch(res => {
                console.log(res);
                if (res.response.data.status === 'error') {
                }
            })
    }

    const getUser = () => {
        axios(`http://localhost:8080/api/user/${uid}`)
            .then(res => {
                console.log(res.data)
                setUserActual(res.data.payload);
                setPosts(res.data.payload.posts)
            })
            .catch(err => console.log(err))
    }

    return (
        <main className='profile'>
            <div className='profile__user-info'>
                <img src={foto} alt="User Image" width={100} height={100} />
                <h2>{userActual.first_name} {userActual.last_name}</h2>
            </div>
            <div className='profile__sections'>
                <Link to="#" onClick={(e) => setActualPage(e.target.textContent)} style={{
                    borderBottom: actualPage === 'Publicaciones' && 'solid #556 2px'
                }}>Publicaciones</Link>
                <Link to="#" onClick={(e) => setActualPage(e.target.textContent)} style={{
                    borderBottom: actualPage === 'Tiempos' && 'solid #556 2px'
                }}>Tiempos</Link>
                <Link to="#" onClick={(e) => setActualPage(e.target.textContent)} style={{
                    borderBottom: actualPage === 'Amigos' && 'solid #556 2px'
                }}>Amigos</Link>
            </div>
            <ProfileSections user={user} uid={uid} uploadPost={uploadPost} setPostText={setPostText} posts={posts} userActual={userActual} section={actualPage} />
        </main >
    )
}

export default Profile