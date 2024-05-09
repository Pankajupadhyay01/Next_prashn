import React from 'react'

const QuestionAnswer = ({ ...data }) => {
    return (
        <div className='bg-gray-800 text-white max-w-screen h-auto w-[80%] p-4 flex flex-col rounded-lg z-50'>

            {/* question title and user name */}
            <div className='flex flex-col gap-4'>

                <div>

                    <h1 className=' capitalize font-bold text-xl'>
                        {data.title}
                    </h1>

                    {/* description of question */}
                    <h3 className='text-lg'>
                        {data.body}
                    </h3>

                </div>

                {/* user name */}
                <div className='flex justify-between items-center'>

                    <p className=' text-cyan-400 capitalize'>
                        Asked By :-
                        <span>
                            {data.askedBy}
                        </span>
                    </p>

                    <div className='bg-gray-200 p-3 rounded-lg text-black font-semibold'>
                        {data.createdAt}
                    </div>
                </div>

            </div>


            jfjsd
        </div>
    )
}

export default QuestionAnswer