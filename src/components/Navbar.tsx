'use client'
import { LogIn, LogOut, Settings, User } from "lucide-react"
import { signOut, useSession } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import Link from "next/link"


const Navbar = () => {
    const { data: session, status } = useSession()
    return (
        <>
            <nav className='p-4 flex justify-between items-center shadow-2xl bg-white'>
                <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-green-500'>
                    Prashn
                </h1>
                <div className="flex justify-center items-center">
                    {
                        session ?
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="bg-gradient-to-t to-purple-500 from-blue-700 p-2 rounded-full">
                                        <User className="text-white" />
                                    </div>
                                </DropdownMenuTrigger>


                                <DropdownMenuContent className="w-56 capitalize">
                                    <DropdownMenuLabel>Welcome Back ! {session.user.username}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <button onClick={() => signOut()}>Log out</button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <Link href={"/signin"} className="flex gap-x-2 bg-blue-900 text-white p-2 capitalize rounded-lg">
                                <LogIn />
                                Log in
                            </Link>
                    }

                </div>
            </nav>
        </>
    )
}

export default Navbar