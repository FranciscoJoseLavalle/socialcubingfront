import React, { useState } from 'react';
import HomePosts from '../HomePosts/HomePosts';
import './Timer.css';

const Timer = () => {
    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [inter, setInter] = useState(null);

    const [isRunning, setIsRunning] = useState(false);
    const [canStart, setCanStart] = useState(false)

    let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const start = () => {
        run();
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
        setTime({ ms: 0, s: 0, m: 0, h: 0 })
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
                    <button onClick={start}>Iniciar</button>
                    <button onClick={stop}>Parar</button>
                    <button onClick={restart}>Reiniciar</button>
                </div>
            </div>
            <HomePosts />
        </main>
    )
}

export default Timer