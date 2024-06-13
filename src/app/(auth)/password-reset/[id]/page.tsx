'use client'
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
const Page = () => {

    const [isSubmitting, setisSubmitting] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const token = useParams().id

    const formSchema = z.object({
        password: z.string().min(8, "Password must be atleast of 8 character"),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: ''
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setisSubmitting(true)
        try {
            const password = values.password

            await axios.put('/api/resetpass', { token, password })

            toast({
                title: "Success",
                description: "Password Reset Sucessfully",
                variant: "sucess",
            })
            router.replace(`/signin`)
            setisSubmitting(false)
        } catch (error) {
            console.log(error);
            
            toast({
                title: "Error",
                description: "Something Went Wrong",
                variant: "destructive"
            })
            setisSubmitting(false)
        }
    }


    return (
        <div className="flex flex-col min-h-screen justify-center items-center w-full bg-gray-200 gap-3">


            <div className="lg:w-[40%] sm:w-[60%] w-[90%] p-6 rounded-xl bg-gradient-to-tr from-gray-300 to-slate-200 ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex justify-center flex-col">

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Your Password" {...field}
                                            onChange={(e) => {
                                                field.onChange(e)

                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting} className="flex  justify-center items-center m-auto ">
                            {
                                isSubmitting ? "Loading.." : "Reset Password"
                            }
                        </Button>
                    </form>
                    <Link className="text-blue-600 w-full flex items-end justify-end" href={"/signin"}>Sign In</Link>
                </Form>
            </div>
        </div>
    )
}

export default Page