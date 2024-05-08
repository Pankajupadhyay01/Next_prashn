'use client'
import QuestionCard from '@/components/QuestionCard'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {
  interface question {
    body: string,
    category: string,
    createdAt: Date,
    title: string,
    userId: { _id: string, username: string }
  }

  const [question, setquestion] = useState<question[]>([])
  const [isLoading, setisLoading] = useState<Boolean>(true)
  useEffect(() => {
    axios.get('http://localhost:3000/api/all-question?page=1&limit=10').then((res) => {
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
        isLoading ? "Loading..." : question.map((obj, i) => (
          <QuestionCard key={i} {...obj} />
        ))
      }
    </div>
  )
}

export default Page