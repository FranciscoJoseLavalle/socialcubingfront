import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import TimeNumber from '../TimeNumber/TimeNumber'
import './Times.css'

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
        <div className='times'>
            {times.toReversed().map(time =>
                <div key={time._id} className="time">
                    <div>
                        <TimeNumber time={time.time} />
                        {time.cathegory}
                        <button>Publicar (Próximamente)</button>
                    </div>
                    <small>{time.scramble}</small>
                </div>
            )}
        </div>
    )
}

export default Times