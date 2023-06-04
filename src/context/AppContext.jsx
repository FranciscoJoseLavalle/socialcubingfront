import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const AppContext = createContext([])

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);
    // const API_URL = "http://localhost:8080"
    const API_URL = "https://socialcubing-production.up.railway.app"

    useEffect(() => {
        getFriends();
    }, [user])

    const getFriends = () => {
        if (user.id) {
            axios(`${API_URL}/api/user/friends/${user.id}`)
                .then(res => {
                    if (res.data.status === "success") {
                        setFriends(res.data.payload);
                    }
                })
                .catch(res => {
                    if (res.response.data.status === 'error') {
                    }
                })
        }
    }

    return (
        <AppContext.Provider value={{ user, setUser, API_URL, getFriends, friends }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider