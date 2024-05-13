import React from 'react'
import QuestionCard from './QuestionCard'
import { Answer } from '@/type/question-answer'
import { ChevronsUp, ChevronsDown } from 'lucide-react';
import AnswerForm from './AnswerForm';
const AnswerCard = ({ ...data }) => { 
    return (
        <div className='w-full'>

            {/* showing question */}
            <div className='flex max-w-full  justify-center my-5'>
                <QuestionCard {...data} />
            </div>

            {/* Answer form  */}
            <AnswerForm />

            {/* Showing answer */}

            <div className='flex flex-col gap-4 bg-[#f1f2f2] py-3'>
                <div className='w-[75%] m-auto bg-slate-500 p-2 rounded-full'>
                    <h5 className='mx-7 text-white font-medium'>
                        Answers ({data?.answers.length})
                    </h5>
                </div>

                {/* main answer section  */}

                {
                    data.answers.map((obj: Answer, i: React.Key) => (


                        < div key={i} className='w-[90%] flex m-auto px-8 border-2 border-white bg-white flex-col gap-3 py-3 rounded-lg' >
                            <div className='rounded-lg'>
                                <h3 className='font-bold text-blue-900 capitalize'>
                                    {obj.user}
                                </h3>
                            </div>

                            <div className='text-gray-600 mx-4'>
                                {obj.answer}
                            </div>

                            <div className='border-2 boder-gray-800 px-5 py-3 rounded-lg flex gap-10'>
                                <div className='flex gap-3 justify-center items-center'>
                                    <div className='bg-blue-900 p-2 rounded-full text-white'>
                                        <ChevronsUp />
                                    </div>
                                    <div className='font-bold'>
                                        upvote ({obj.upvote})
                                    </div>
                                </div>
                                <div className='flex gap-3 justify-center items-center'>
                                    <div className='bg-blue-900 p-2 rounded-full text-white'>
                                        <ChevronsDown />
                                    </div>
                                    <div className='font-bold'>
                                        downvote ({obj.downvote})
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                }


            </div>

        </div >
    )
}

export default AnswerCard
