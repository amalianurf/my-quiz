import { useState, useEffect, useCallback } from 'react'
import QuestionCard from './QuestionCard'
import TimerCard from './TimerCard'
import { useNavigate } from 'react-router-dom'

function Quiz() {
  const quizData = JSON.parse(localStorage.getItem('quizData')) || []
  const [data, setData] = useState(quizData)
  const [done, setDone] = useState(0)
  const [quiz, setQuiz] = useState()
  const navigate = useNavigate()

  const [index, setIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(JSON.parse(localStorage.getItem('timeLeft')) || 2 * 60) // waktu 5 menit

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
      localStorage.setItem('timeLeft', JSON.stringify(timeLeft))
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      navigate('/result', { state: data })
    }
  }, [timeLeft, navigate, data])

  const [loading, setLoading] = useState(true)

  const handleClick = useCallback((newIndex, user_answer) => {
    if (data?.length > newIndex) {
      setIndex(newIndex)
    } else {
      let newData = [...data]
      newData[index].user_answer = user_answer
      setData(newData)
      localStorage.setItem('quizData', JSON.stringify(data))
      navigate('/result', { state: data })
    }
    let newData = [...data]
    newData[index].user_answer = user_answer
    setData(newData)
    localStorage.setItem('quizData', JSON.stringify(data))
  }, [data, index, navigate, setData, setIndex])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://opentdb.com/api.php?amount=5&category=27&type=multiple'
        )

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setData(data.results.map((item) => ({
          ...item,
          user_answer: '',
        })))
        setQuiz(data.results[0].category)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false);
      }
    }

    if (data?.length === 0) {
      fetchData()
    } else {
      setQuiz(data.category)
      setLoading(false)
    }
  }, [data])

  useEffect(() => {
    let newIndex = 0
    while (newIndex < data.length && data[newIndex].user_answer !== '') {
      newIndex++
      if (newIndex < data.length) {
        setIndex(newIndex)
        setDone(newIndex)
      } else {
        navigate('/result', { state: data })
      }
    }

  }, [data, setIndex, setDone, navigate])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-full px-10 md:px-28 pt-3 md:pt-8 pb-20'>
      <h1 className='font-bold text-2xl text-black'>Quiz : {quiz}</h1>
      <div className='flex md:hidden justify-end w-full pt-5 pb-3'>
        <TimerCard waktu={timeLeft} setTimeLeft={setTimeLeft} />
      </div>
      <div className='md:grid grid-cols-3 gap-3 w-full md:py-8'>
        <div className='col-start-1 col-end-3'>
          <QuestionCard done={done} dataLength={data?.length} data={data[index]} handleClick={handleClick} index={index} />
        </div>
        <div className='hidden md:flex'>
          <div className='flex-none w-full'>
            <TimerCard timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
