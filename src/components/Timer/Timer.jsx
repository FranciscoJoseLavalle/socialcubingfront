import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import HomePosts from '../HomePosts/HomePosts';
import './Timer.css';
import useTitle from '../../customHooks/useTitle'
import TimeNumber from '../TimeNumber/TimeNumber';
import generateScramble from 'scramble-generator';
import { Simulate } from 'react-dom/test-utils';

const Timer = () => {
    const { user, API_URL } = useContext(AppContext);

    useTitle('Inicio')

    useEffect(() => {
        getScramble();
    }, [])


    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [lastTime, setLastTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [inter, setInter] = useState(null);
    const [finalScramble, setFinalScramble] = useState("");

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
            timeGetted: { user: user.id, time, cathegory: "3x3", scramble: finalScramble },
            uid: user.id
        }
        axios.post(`${API_URL}/api/times`, params)
            .then(res => {
                console.log(res.data);
                getScramble()
                if (res.data.status === "success") {
                }
            })
            .catch(res => {
                console.log(res);
                if (res.response.data.status === 'error') {
                }
            })
    }

    const getScramble = () => {
        let scramble = generateScramble({ cubeSize: 3, formatted: false })
        let newScramble = "";
        scramble.forEach(el => {
            let scr = `${el.face}${el.inverted ? "'" : ""}${el.double ? "2" : ""} `
            newScramble += scr;
        })
        setFinalScramble(newScramble);
    }

    // document.addEventListener('keyup', (e) => {
    //     if (e.code === "Space") {
    //         start()
    //     }
    // })
    return (
        <main className='timer'>
            <div className='timerContenedor'>
                <p style={{
                    fontSize: "1rem",
                    fontFamily: "Arial"
                }}>Último tiempo: </p><TimeNumber time={lastTime} />
                <p style={{
                    fontSize: "1rem",
                    fontFamily: "Arial"
                }}>{finalScramble}</p>
                <TimeNumber time={time} />
                <div className='timer__buttons'>
                    <button onClick={start}>Iniciar / Parar</button>
                </div>
            </div>
            <HomePosts />
        </main>
    )
}

export default Timer