import axios from 'axios';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import foto from '../../assets/img/user.webp'
import { AppContext } from '../../context/AppContext';
import { storage } from '../../config/firebase.config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import './Profile.css';
import ProfileSections from '../ProfileSections/ProfileSections';
import useTitle from '../../customHooks/useTitle';

const Profile = () => {
    const { user, API_URL } = useContext(AppContext);
    let { uid } = useParams();
    const [userActual, setUserActual] = useState({});
    const [postText, setPostText] = useState('');
    const [media, setMedia] = useState(null);
    const [posts, setPosts] = useState([]);

    const [image, setImage] = useState(null);

    const [actualPage, setActualPage] = useState('Publicaciones')

    useEffect(() => {
        getUser();
        getPosts();
    }, [uid])

    const uploadPost = (e) => {
        e.preventDefault();
        if (media) {
            const imageRef = ref(storage, uid + Date.now())
            uploadBytes(imageRef, media)
                .then(() => {
                    getDownloadURL(imageRef).then((url) => {
                        endUpload(url, e)
                    })
                })
        } else {
            endUpload(null, e);
        }
    }

    const endUpload = (url, e) => {
        let post = {
            text: postText,
            media: url,
            timestamp: Date.now(),
            author: userActual._id,
        }
        let params = {
            uid: userActual._id,
            post
        }
        axios.post(`${API_URL}/api/user/post`, params)
            .then(res => {
                if (res.data.status === "success") {
                    getPosts();
                    e.target.reset();
                }
            })
            .catch(res => {
                if (res.response.data.status === 'error') {
                }
            })
    }

    const getUser = () => {
        axios(`${API_URL}/api/user/${uid}`)
            .then(res => {
                setUserActual(res.data.payload);
            })
            .catch(err => console.log(err))
    }

    const getPosts = () => {
        axios(`${API_URL}/api/posts/${uid}`)
            .then(res => {
                setPosts(res.data.payload)
            })
            .catch(err => console.log(err))
    }

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const changeImage = () => {
        const imageRef = ref(storage, uid + Date.now())
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setNewImage(url)
                })
            })
    }

    const setNewImage = (url) => {
        let params = {
            uid: user.id,
            url
        }
        axios.post(`${API_URL}/api/user`, params)
            .then(res => {
                if (res.data.status === "success") {
                    getUser();
                }
            })
            .catch(res => {
                if (res.response.data.status === 'error') {
                }
            })
    }

    return (
        <main className='profile'>
            <div className='profile__user-info'>
                <div className='profile__user-info-thumbnail'>
                    {userActual.thumbnail ? <img src={userActual.thumbnail} alt="User Image" width={100} height={100} /> : <img src={foto} alt="User Image" width={100} height={100} />}
                    <h2>{userActual.first_name} {userActual.last_name}</h2>
                </div>
                {userActual._id === user.id
                    && <div className='profile__user-info-changeImage'>
                        <input type="file" onChange={handleImageChange} />
                        <button onClick={changeImage} disabled={image ? false : true}>Cambiar imagen</button>
                    </div>
                }
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
            <ProfileSections user={user} uid={uid} uploadPost={uploadPost} setPostText={setPostText} posts={posts} section={actualPage} setMedia={setMedia} />
        </main >
    )
}

export default Profile