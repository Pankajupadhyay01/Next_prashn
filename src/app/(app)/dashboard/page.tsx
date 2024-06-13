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


const page = () => {
    const { data: session, status } = useSession()
    const deleteFunc = () => {
        alert("clicked")
    }
    return (
        <div>
            <div className="flex w-full justify-center p-10 capitalize text-xl text-purple-900 ">
                hii
                <span className="mx-2">
                    {session?.user.username}
                </span>
            </div>

            <div>
                <AlertDialog>
                    <Card className="w-[350px]">
                        <CardHeader className="flex flex-col gap-8">
                            <CardTitle>Create project</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
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
                            <AlertDialogAction onClick={deleteFunc}>Sure</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default page