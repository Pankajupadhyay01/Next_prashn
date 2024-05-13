'use client'
import React from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from './ui/use-toast'
import { useParams } from 'next/navigation'

const AnswerForm = () => {
    const id = useParams().id


    const formSchema = z.object({
        answer: z.string().min(2, {
            message: "Please write your answer ",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            answer: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const data = await axios.post(`/api/solve-question/${id}`, { content: values.answer }) 
            toast({
                title: "Answer Post Sucessfully",
                description: data.data.message,
                variant: "sucess"
            })
        } catch (error: any) {
            const errMsg = error.response.data.message
            toast({
                title: "Error While Posting Your Question",
                description: errMsg,
                variant: "destructive"
            })
        }
    }
    return (
        <Drawer >
            <DrawerTrigger asChild>
                <Button className=' w-full bg-blue-950 text-white font-bold' variant="outline">Answer This Question </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Make An Answer </DrawerTitle>
                        <DrawerDescription>Your Answer Can Help Someone.</DrawerDescription>
                    </DrawerHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full flex justify-center flex-col">

                            <FormField
                                control={form.control}
                                name="answer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write Your Answer .. "
                                                className="resize-none w-full outline"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button>Post</Button>
                        </form>
                    </Form>
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button className='w-[20%] m-auto' variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default AnswerForm
