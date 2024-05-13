'use client'

import { useParams } from "next/navigation"
import QuestionForm from "@/components/QuestionForm"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { questions } from "@/type/question-answer"
import AnswerCard from "@/components/AnswerCard"

const page = () => {
    const id = useParams().id
    const [isLoading, setisLoading] = useState<Boolean>(true)
    const [data, setdata] = useState<questions | null>(null)
    // fetching question
    const fetchQuestion = async () => {
        axios.get(`/api/get-question?id=${id}`)
            .then((res) => {
                const data = res.data?.data[0]
                setdata(data)
                setisLoading(false)
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
            <div className="md:w-[68%] w-full ">
                {
                    isLoading ?
                        <p>Loading...</p> : <AnswerCard {...data} />
                }
            </div>

            {/* ask question form question  */}
            <div className="w-full md:w-[30%]">
                <QuestionForm />
            </div>
        </div>
    )
}

export default page
