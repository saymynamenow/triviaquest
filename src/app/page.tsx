'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Question{
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);

  useEffect(() =>{
    const fetchData = async () =>{
      const response = await axios.get('https://opentdb.com/api.php?amount=10&category=28')
      setQuestions(response.data.results)
    }

    fetchData()
  }, [])
  useEffect(() =>{
      if(questions.length > 0){
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
        setRandomQuestion(randomQuestion)
        console.log(randomQuestion)
      }
  }, [questions])

  const handleAnswerSelection = (answer: string) =>{
    if(answer === randomQuestion?.correct_answer){
      const nextQuestion = questions[Math.floor(Math.random() * questions.length)];
      setRandomQuestion(nextQuestion)
      
    }else{
      alert('Incorrect');
    }
  }

  return (
    <div className="text-center mt-5">
      <h1>Trivia Quests</h1>
      {randomQuestion && (
        <div>
          <h3 className='text-4xl'>{randomQuestion.question}</h3>
          <div className='mt-3 grid grid-cols-2 gap-4'>
            {[...randomQuestion.incorrect_answers, randomQuestion.correct_answer].sort().map((answer, index) => (
              <button key={index} onClick={() => handleAnswerSelection(answer)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 p-5'>{answer}</button>
            ))}
          </div>
        </div>
        
      )}
    </div>
  );
}
