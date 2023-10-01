import { useState, useEffect } from 'react'

const QuestionCard = (props) => {
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    useEffect(() => {
        const allAnswers = [props.data.correct_answer, ...props.data.incorrect_answers];
        const shuffled = shuffleArray(allAnswers);
        setShuffledAnswers(shuffled);
    }, [props.data]);

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

  return (
    <div key={props.key} className='w-full h-fit bg-white px-8 py-5 rounded-lg shadow-md'>
        <div className='flex justify-between md:justify-start items-center w-full my-2'>
            <p className='text-primary font-bold text-lg md:text-xl'>Soal {props.index+1}</p>
        </div>
        <p className='w-full text-black text-justify my-4' dangerouslySetInnerHTML={{ __html: props.data.question }}></p>
        <div className='w-full my-1'>
        {shuffledAnswers.map((answer, index) => (
            <button key={index} onClick={() => props.handleClick(props.index + 1, answer)} className={'w-full border-2 bg-white border-primary text-primary px-3 py-2 my-1 text-left hover:bg-blue-100 transition-all duration-100 rounded-md'} dangerouslySetInnerHTML={{ __html: answer }}></button>
        ))}
        </div>
    </div>
  )
}

export default QuestionCard