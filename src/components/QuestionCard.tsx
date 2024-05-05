import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const QuestionCard = ({ ...obj }) => {
    return (
        <>
            <Link href={"/signin"} className='bg-white max-w-screen h-auto w-[80%] p-4 flex flex-col rounded-lg z-50'>

                {/* question title and user name */}
                <div className='flex flex-col gap-4'>

                    <div>

                        <h1 className=' capitalize font-bold text-xl'>
                            {obj.title}
                        </h1>

                        {/* description of question */}
                        <h3 className='text-lg'>
                            {obj.body}
                        </h3>

                    </div>

                    {/* user name */}
                    <div className='flex justify-between items-center'>

                        <p className='text-blue-500 capitalize'>
                            Asked By :-
                            <span>
                                {obj.userId.username}
                            </span>
                        </p>

                        <div className='bg-gray-200 p-3 rounded-lg'>
                            {obj.category}
                        </div>
                    </div>

                </div>
            </Link>
        </>
    )
}

export default QuestionCard