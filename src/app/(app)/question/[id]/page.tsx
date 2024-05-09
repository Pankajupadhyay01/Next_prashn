'use client'

import { useParams } from "next/navigation"
import QuestionForm from "@/components/QuestionForm"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import QuestionAnswer from "@/components/QuestionAnswer"
import { question } from "@/type/question-answer"

const page = () => {
    const id = useParams().id
    const [isLoading, setisLoading] = useState<Boolean>(true)
    const [data, setdata] = useState<question | null>(null)
    // fetching question
    const fetchQuestion = async () => {
        axios.get(`http://localhost:3000/api/get-question?id=${id}`)
            .then((res) => {
                setisLoading(false)
                const data = res.data?.data[0]
                setdata(data)
            }).catch((err) => {
                setisLoading(false)
                toast({
                    title: "Error",
                    description: "Error fetching question",
                    variant: "destructive"
                })
            })
    }

    useEffect(() => {
        fetchQuestion()
    }, [])

    return (
        <div className="flex md:flex-row flex-col justify-between w-[95%] m-auto h-full">
            <div className="flex flex-col items-center w-full md:w-[68%] mt-5 ">
                {
                    isLoading ?
                        <p>Loading...</p> : <QuestionAnswer {...data} />
                }
            </div>

            {/* ask question form question  */}
            <div className="w-full md:w-[30%] ">
                <QuestionForm />
            </div>
        </div>
    )
}

export default page
