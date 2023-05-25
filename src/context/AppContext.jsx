import axios from 'axios';
import React, { useState } from 'react'
import { createContext } from 'react'

export const AppContext = createContext([])

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    // const API_URL = "http://localhost:8080"
    const API_URL = "https://socialcubing-production.up.railway.app"

    function logout() {
        axios.post(`${API_URL}/api/sessions/logout`)
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
        axios.post(`${API_URL}/api/user/friends`, params)
            .then(res => {
                if (res.data.status === "success") {
                }
            })
            .catch(res => {
                if (res.response.data.status === 'error') {
                }
            })
    }

    return (
        <AppContext.Provider value={{ user, setUser, logout, addFriend, API_URL }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider