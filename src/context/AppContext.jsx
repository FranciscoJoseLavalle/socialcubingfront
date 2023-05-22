import axios from 'axios';
import React, { useState } from 'react'
import { createContext } from 'react'

export const AppContext = createContext([])

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    function logout() {
        axios.post("http://localhost:8080/api/sessions/logout")
            .then(res => {
                if (res.data.status === "success") {
                    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    setUser({});
                }
            })
            .catch(console.log)
    }

    const addFriend = (fid) => {
        let params = {
            uid: user.id,
            fid
        }
        axios.post("http://localhost:8080/api/user/friends", params)
            .then(res => {
                console.log(res.data);
                if (res.data.status === "success") {
                }
            })
            .catch(res => {
                console.log(res);
                if (res.response.data.status === 'error') {
                }
            })
    }

    return (
        <AppContext.Provider value={{ user, setUser, logout, addFriend }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider