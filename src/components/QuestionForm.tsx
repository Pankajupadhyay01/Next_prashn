'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Textarea } from "./ui/textarea"
import axios from "axios"
import { toast } from "./ui/use-toast"
import { useRouter } from "next/navigation"
const QuestionForm = () => {
    const router = useRouter()
    const formSchema = z.object({
        title: z.string().min(10, "Title must be at least 10 characters"),
        body: z.string().min(10, "Describe Question minimum in 10 characters"),
        category: z.string().min(1, "Please Select Yor Category")
    })

    let form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            body: '',
            category: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const data = await axios.post("/api/ask-question", values)
            toast({
                title: "Success",
                description: data.data.message,
                variant: "sucess",
            })
            router.replace(`/`)
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
        <Card className="w-full my-5 border-2 border-black">
            <CardHeader>
                <CardTitle>Ask An Question</CardTitle>
                <CardDescription>Ask Your Doutin one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex justify-center flex-col">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Your Question Title" {...field}
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
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe Your Question"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} >
                                        <SelectTrigger id="Category">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="tech">Tech</SelectItem>
                                            <SelectItem value="Non tech">Non Tech</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button>Deploy</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default QuestionForm
