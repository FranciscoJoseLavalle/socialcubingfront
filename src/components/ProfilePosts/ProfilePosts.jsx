import moment from 'moment'
import Post from '../Post/Post';
import './ProfilePosts.css'

const ProfilePosts = ({ user, uid, uploadPost, setPostText, posts, setMedia }) => {
    console.log(posts);
    return (
        <div className='profile__posts'>
            {
                user.id === uid
                && <form onSubmit={uploadPost}>
                    <textarea placeholder="¿Qué estás pensando?" onChange={(e) => setPostText(e.target.value)}></textarea>
                    <input type="file" onChange={(e) => setMedia(e.target.files[0])} />
                    <button>Publicar</button>
                </form>
            }
            <div className='profile__posts-container'>
                {posts.toReversed().map((element) =>
                    <Post key={element._id} element={element} />
                )}
            </div>
        </div>
    )
}

export default ProfilePosts