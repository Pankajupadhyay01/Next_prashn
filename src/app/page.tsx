'use client'
import QuestionCard from '@/components/QuestionCard'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
  interface question {
    _id: string,
    body: string,
    category: string,
    createdAt: Date,
    title: string,
    userId: { _id: string, username: string }
  }

  const [question, setquestion] = useState<question[]>([])
  const [isLoading, setisLoading] = useState<Boolean>(true)

  
  useEffect(() => {
    axios.get('/api/all-question?page=1&limit=10').then((res) => {
      setisLoading(false)
      setquestion(res.data.slicedData)
    }).catch(e => {
      setisLoading(false)
      toast({
        title: "Login Failed Error ",
        description: "Somthing went wrong. Please refresh the page ",
        color: "error",
        variant: "destructive"
      })
    })

  }, [])

  return (
    <div className='flex z-50 flex-col my-4 gap-4 w-full items-center'>


      {
        isLoading ? (<p>Loading...</p>) :

          (
            question.length === 0 ? "No Question Found" : question.map((data, i) => (
              <Link key={i} href={`/question/${data._id}`} className='max-w-screen w-[80%] flex m-auto justify-center items-center'>
                <QuestionCard {...data} />
              </Link>
            ))
          )
      }
    </div>
  )
}

export default Page