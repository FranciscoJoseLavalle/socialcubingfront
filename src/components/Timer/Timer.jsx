import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import HomePosts from '../HomePosts/HomePosts';
import './Timer.css';

const Timer = () => {
    const { user } = useContext(AppContext);
    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [inter, setInter] = useState(null);

    const [isRunning, setIsRunning] = useState(false);
    const [canStart, setCanStart] = useState(false)

    let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const start = () => {
        time === { ms: 0, s: 0, m: 0, h: 0 } ? run() : restart()
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
        console.log(time);
        time != { ms: 0, s: 0, m: 0, h: 0 } && saveTime()
        setTime({ ms: 0, s: 0, m: 0, h: 0 })
    }

    useEffect(() => {
        axios(`socialcubing-production.up.railway.app/api/times`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const saveTime = () => {
        console.log(time);
        if (time != { ms: 0, s: 0, m: 0, h: 0 }) {
            let params = {
                timeGetted: { user: user.id, time, cathegory: "3x3", scramble: "U2 D2 L F R U B2 U'" }
            }
            // axios.post("socialcubing-production.up.railway.app/api/times", params)
            //     .then(res => {
            //         console.log(res.data);
            //         if (res.data.status === "success") {
            //         }
            //     })
            //     .catch(res => {
            //         console.log(res);
            //         if (res.response.data.status === 'error') {
            //         }
            //     })
        }
    }


    // document.addEventListener('keydown', (e) => {
    //     if (e.code === 'Space') {
    //         console.log(canStart);
    //         console.log(isRunning);
    //         if (canStart === true && isRunning === true) {
    //             setCanStart(false);
    //             setIsRunning(false);
    //             console.log("FRENADO");
    //         } else {
    //             console.log("PREPARANDO");
    //             setCanStart(true);
    //         }
    //         // setIsRunning(!isRunning);
    //         // console.log(isRunning);
    //         // if (isRunning) {
    //         //     stop();
    //         //     console.log('frenado');
    //         // } else {
    //         //     start();
    //         //     console.log('Corriendo');
    //         // }
    //     }
    // })

    // document.addEventListener('keyup', (e) => {
    //     if (e.code === 'Space') {
    //         if (canStart === true) {
    //             setIsRunning(true);
    //             console.log("CORRIENDO");
    //         }
    //     }
    // })

    return (
        <main className='timer'>
            <div className='timerContenedor'>
                <p>{`${time.m > 0 ? `${time.m >= 10 ? time.m : `0${time.m}`}:` : ''}${time.s >= 10 ? time.s : `0${time.s}`}:${time.ms >= 10 ? time.ms : `0${time.ms}`}`}</p>
                <div className='timer__buttons'>
                    <button onClick={start}>Iniciar / parar</button>
                    {/* <button onClick={stop}>Parar</button>
                    <button onClick={restart}>Reiniciar</button> */}
                </div>
            </div>
            <HomePosts />
        </main>
    )
}

export default Timer