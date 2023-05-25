import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Times = ({ uid }) => {
    const { API_URL } = useContext(AppContext)
    const [times, setTimes] = useState([])

    useEffect(() => {
        axios(`${API_URL}/api/times/${uid}`)
            .then(res => {
                console.log(res.data);
                setTimes(res.data.payload.times);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            {times.toReversed().map(time =>
                <div key={time._id}>{`${time.time.m > 0 ? `${time.time.m >= 10 ? time.time.m : `0${time.time.m}`}:` : ''}${time.time.s >= 10 ? time.time.s : `0${time.time.s}`}:${time.time.ms >= 10 ? time.time.ms : `0${time.time.ms}`}`} {time.cathegory}</div>
            )}
        </div>
    )
}

export default Times