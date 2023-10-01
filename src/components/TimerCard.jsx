import React from 'react'

function TimerCard({ timeLeft }) {
    const hours = Math.floor(timeLeft / 3600)
    const minutes = Math.floor((timeLeft % 3600) / 60)
    const seconds = timeLeft % 60
  
    const setTimeText = (time) => (time >= 10) ? time : `0${time}`
  
    return (
      <div className='w-28 md:w-full p-2 md:p-5 md:mb-4 bg-white rounded-lg shadow-md'>
        <p className='hidden md:flex w-full font-bold'>Sisa Waktu Pengerjaan</p>
        <p className='w-full md:w-full font-bold text-lg md:text-3xl flex justify-center md:mt-3'>{setTimeText(hours)}:{setTimeText(minutes)}:{setTimeText(seconds)}</p>
      </div>
    )
}

export default TimerCard