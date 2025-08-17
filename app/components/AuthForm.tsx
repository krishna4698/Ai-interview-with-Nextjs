"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "lucide-react"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

function AuthForm({type}:{type:FormType}) {
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    
  }
const SignIn= type=='sign-in';
  return (
    <div>
        <h2>Do interview preparation</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                { !SignIn &&  <p>name</p>}
                <p>email</p>
                <p>password</p>
        <Button className="btn" type="submit">{SignIn ? "sign-in" : "Create an Account"}</Button>
       <p>{SignIn ?"no account yet": "Have an account"}
        <Link href={!SignIn ? '/sign-in':'/sign-up'}>{!SignIn?'sign-in':'sign-up'}</Link>
        
       </p>

      </form>
    </Form>
    </div>
  )
}

export default AuthForm
