'use client'
import { useSession } from "next-auth/react"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Trash2, Eye } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { question } from "@/modal/Question";
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [question, setquestion] = useState<question[]>([])
    useEffect(() => {
        axios.get('/api/user-dashboard').then((res) => {
            // setisLoading(false)
            setquestion(res.data.questions)
        }).catch(e => {
            // setisLoading(false)
            toast({
                title: "Login Failed Error ",
                description: "Somthing went wrong. Please refresh the page ",
                color: "error",
                variant: "destructive"
            })
        })
    }, [])


    const deleteFunc = async (id: String) => {
        try {

            const data = await axios.delete(`/api/remove-question/${id}`)
            toast({
                title: "Success",
                description: data.data.msg,
                variant: "sucess",
            })
            router.replace(`/`)
        } catch (error: any) {
            const errMsg = error.response.data.msg
            toast({
                title: "Error While Deleting Your Question",
                description: errMsg,
                variant: "destructive"
            })
        }
    }


    return (
        <div>
            <div className="flex w-full justify-center p-10 capitalize text-xl text-purple-900 ">
                hii
                <span className="mx-2">
                    {session?.user.username}
                </span>
            </div>

            {question.length === 0 ?
                <div className="w-full justify-center flex items-center font-extrabold text-2xl">
                    No question asked by you
                </div>
                :
                <div className="flex  gap-4">
                    {
                        question.map((obj, i) => (

                            <div key={i} >
                                <AlertDialog>
                                    <Card className="w-[350px]">
                                        <CardHeader className="flex flex-col gap-8">
                                            <CardTitle>{obj.title}</CardTitle>
                                            <CardDescription>{obj.body}</CardDescription>
                                        </CardHeader>

                                        <CardFooter className="flex justify-between">
                                            <Button variant="outline" className="bg-blue-500 text-white">
                                                <Eye />
                                            </Button>

                                            <AlertDialogTrigger asChild>
                                                <Button className="bg-red-500">
                                                    <Trash2 />
                                                </Button>
                                            </AlertDialogTrigger>

                                        </CardFooter>
                                    </Card>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your question from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteFunc(obj._id)}>Sure</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>

                        ))}
                </div>

            }
        </div>
    )
}

export default Page