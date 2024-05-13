'use client'
import { useParams, useRouter } from 'next/navigation'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'


const Page = () => {
  const router = useRouter()
  const id = useParams().id
  const [isLoading, setisLoading] = useState<Boolean>(false)
  const [value, setValue] = useState<string>()


  // handling submit
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!value) {
      toast({
        title: "Error",
        description: "Please enter One Time Password",
        variant: "destructive"
      })

    }
    else {
      try {
        setisLoading(true)

        const data = await axios.post(`/api/signup/verify?id=${id}`, { otp: value })
        toast({
          title: "Success",
          description: data.data.message,
          variant: "sucess"
        })
        setisLoading(false)
        router.replace(`/signin`)
      }
      catch (error: any) {
        console.log(error);

        toast({
          title: "Error",
          description: error.response.data.message,
          variant: "default"
        })
        setisLoading(false)
      }
    }
  }

  return (
    <div className="space-y-4 min-h-screen flex justify-center items-center flex-col bg-gray-200 ">
      <div className="text-center text-sm">
        <>Enter your one-time password.</>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4' >

        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button type="submit" className="flex  justify-center items-center m-auto ">
          {
            isLoading ?
              <Ellipsis className='animate-spin duration-75' />
              : "Submit"
          }
        </Button>
      </form>

    </div>
  )
}

export default Page