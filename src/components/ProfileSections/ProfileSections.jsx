import React from 'react'
import ProfilePosts from '../ProfilePosts/ProfilePosts'
import Friends from '../Friends/Friends'

const ProfileSections = ({ user, uid, uploadPost, setPostText, posts, userActual, section }) => {
    if (section === 'Publicaciones') {
        return (
            <ProfilePosts user={user} uid={uid} uploadPost={uploadPost} setPostText={setPostText} posts={posts} userActual={userActual} />
        )
    }
    if (section === 'Amigos') {
        return (
            <Friends user={user} uid={uid} uploadPost={uploadPost} setPostText={setPostText} posts={posts} userActual={userActual} />
        )
    }
    return (
        <p>Próximamente...</p>
    )

}

export default ProfileSections