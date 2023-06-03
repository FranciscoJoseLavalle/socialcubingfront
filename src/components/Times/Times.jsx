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
                setTimes(res.data.payload.times);
                getAverages(res.data.payload.times);
            })
            .catch(err => console.log(err))
    }, [])

    const getAverages = (data) => {
        // console.log(data);
        // data.forEach(el => {
        //     if (el.cathegory === "3x3") {
        //         console.log(el.time);
        //     }
        // })
    }

    return (
        <div className='times'>
            {times.length > 0
                ? <>{times.toReversed().map(time =>
                    <div key={time._id} className="time">
                        <div>
                            <TimeNumber time={time.time} />
                            {time.cathegory}
                            <button>Publicar (Próximamente)</button>
                        </div>
                        <small>{time.scramble}</small>
                    </div>
                )}
                </>
                : <p>Todavía no te tomaste el tiempo...</p>
            }

        </div>
    )
}

export default Times