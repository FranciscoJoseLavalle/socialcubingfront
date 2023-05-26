import React from 'react'

const TimeNumber = ({ time }) => {
    return (
        <p>{`${time.m > 0 ? `${time.m >= 10 ? time.m : `0${time.m}`}:` : ''}${time.s >= 10 ? time.s : `0${time.s}`}:${time.ms >= 10 ? time.ms : `0${time.ms}`}`}</p>
    )
}

export default TimeNumber