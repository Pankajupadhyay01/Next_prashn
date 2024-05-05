'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signupValidation } from "@/validationSchema/signupSchema"
import axios from "axios"
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

const Page = () => {

    const [isSubmitting, setisSubmitting] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const formSchema = z.object({
        username: z.string().min(2, "Username must be at least 2 characters")
            .max(20, "Username must be less than 20 characters."),
        email: z.string().email({ message: "Please Enter Valid Email" }),
        password: z.string().min(8, "Password must be atleast of 8 character ")
    })

    let form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof signupValidation>) => {
        setisSubmitting(true)
        try {
            const data = await axios.post('/api/signup', values)

            const id = data.data.id
            toast({
                title: "Success",
                description: data.data.message,
                variant: "sucess",
            })
            router.replace(`/verify/${id}`)
            setisSubmitting(false)
        } catch (error: any) {

            console.log(error);

            const errMsg = error.response.data.message
            toast({
                title: "Sign Up Failed",
                description: errMsg,
                variant: "destructive"
            })
            setisSubmitting(false)
        }
    }


    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 gap-3">
            <h1 className="text-3xl font-bold text-black">
                Sign Up
            </h1>
            <div className="lg:w-[40%] sm:w-[60%] w-[90%] p-6 rounded-xl bg-gradient-to-tr from-gray-300 to-slate-200 ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex justify-center flex-col">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Your Username" {...field}
                                            onChange={(e) => {
                                                field.onChange(e)

                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Your Email" {...field}
                                            onChange={(e) => {
                                                field.onChange(e)

                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Your Password " {...field}
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
                                isSubmitting ? "Loading.." : "Submit"
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page