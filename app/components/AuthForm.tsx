"use client"

import { email, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/actions/auth.action"
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
import Link from "next/link"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client"
import { toast } from "sonner"
import { useRouter } from "next/router"



const formSchema = z.object({
  name: z.string().min(2).max(50),
  email:z.string(),
  password:z.string().min(3)
})


function AuthForm({type}:{type:FormType}) {
  const router=useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) {
     try{
   if(type==='sign-up'){
    const{name,email,password}=values;

    const userCredentials= await createUserWithEmailAndPassword(auth,email,password)
    const result=await signUp({
      uid:userCredentials.user.uid,
      name:name!,
      email,
      password
    });
    if(!result?.success){
      toast.error(result?.message);
      return;
    }
    toast.success("account created succesful");
      router.push("/sign-in");
    
   }
   else{
    toast.success("sign  in succesfully");
    router.push("/");
   }
   
     }
     catch(error){
   toast.error(`There is a error ${error}`)
     }
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
  
