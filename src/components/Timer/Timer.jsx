import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import HomePosts from '../HomePosts/HomePosts';
import './Timer.css';
import useTitle from '../../customHooks/useTitle'

const Timer = () => {
    const { user, API_URL } = useContext(AppContext);

    useTitle('Inicio')

    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [lastTime, setLastTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [inter, setInter] = useState(null);

    const [isRunning, setIsRunning] = useState(false);
    const [canStart, setCanStart] = useState(false)

    let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const start = () => {
        if (time.ms === 0 && time.s === 0 && time.m === 0 && time.h === 0) {
            run()
        } else {
            restart()
        }
        !inter && setInter(setInterval(run, 10))
    };

    const stop = () => {
        clearInterval(inter)
        setInter(null);
    };
    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        if (updatedMs === 100) {
            updatedS++;
            updatedMs = 0;
        }
        updatedMs++;
        return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
    };

    const restart = () => {
        stop()
        setLastTime(time);
        if (user.name) {
            saveTime()
        }
        setTime({ ms: 0, s: 0, m: 0, h: 0 })
    }

    const saveTime = () => {
        let params = {
            timeGetted: { user: user.id, time, cathegory: "3x3", scramble: "U2 D2 L F R U B2 U'" },
            uid: user.id
        }
        axios.post(`${API_URL}/api/times`, params)
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
        <main className='timer'>
            <p>Último tiempo: {`${lastTime.m > 0 ? `${lastTime.m >= 10 ? lastTime.m : `0${lastTime.m}`}:` : ''}${lastTime.s >= 10 ? lastTime.s : `0${lastTime.s}`}:${lastTime.ms >= 10 ? lastTime.ms : `0${lastTime.ms}`}`}</p>
            <div className='timerContenedor'>
                <p>{`${time.m > 0 ? `${time.m >= 10 ? time.m : `0${time.m}`}:` : ''}${time.s >= 10 ? time.s : `0${time.s}`}:${time.ms >= 10 ? time.ms : `0${time.ms}`}`}</p>
                <div className='timer__buttons'>
                    <button onClick={start}>Iniciar / parar</button>
                </div>
            </div>
            <HomePosts />
        </main>
    )
}

export default Timer