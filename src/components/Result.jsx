import React from 'react'
import { useLocation } from 'react-router-dom'

function Result() {
    const location = useLocation()
    const data = location.state

    const quiz = data[0].category
    let correctAnswer = 0
    let wrongAnswer = 0
    let noAnswer = 0
    for (let i = 0; data?.length > i; i++) {
      if (data[i].user_answer === data[i].correct_answer) {
        correctAnswer++
      } else if (data[i].user_answer === '') {
        noAnswer++
      } else {
        wrongAnswer++
      }
    }

  return (
    <div className='w-full px-10 md:px-28 pt-3 md:pt-8 pb-20'>
      <h1 className='font-bold text-2xl text-black'>Result Quiz : {quiz}</h1>
      <div className='flex pt-5'>
          <div className='flex-none w-full'>
            <div className='w-[50%] p-2 md:p-5 md:mb-4 bg-white rounded-lg shadow-md'>
              <p className='w-full md:w-full font-bold text-sm md:text-lg flex justify-start'>Correct : {correctAnswer}</p>
              <p className='w-full md:w-full font-bold text-sm md:text-lg flex justify-start'>Wrong : {wrongAnswer}</p>
              <p className='w-full md:w-full font-bold text-sm md:text-lg flex justify-start'>No answer : {noAnswer}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Result