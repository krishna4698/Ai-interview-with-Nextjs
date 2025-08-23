"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { success } from "zod";

const ONE_WEEK=60*60*24*7;
export async function signUp(params:SignUpParams){
    const {uid, name, email}=params;
     try {
      const userRecord=await db.collection('users').doc(uid).get();

      if(userRecord.exists){
      return {
         success:false,
         message:"user already exits"
      }
      }
      await db.collection('users').doc(uid).set({
         email,name
      })
      return {
         success:true,
         message:"account created please signin"
      }
        
     } catch (e) {
        console.error("cannot do that ",e)
        
     }
}

export async function setSessionCokkie(idToken:string){
     const cookieStore= await cookies()
     const SessionCokkie= await auth.createSessionCookie(idToken,{
      expiresIn: ONE_WEEK *1000,
     })
     cookieStore.set('session',SessionCokkie,{
      maxAge:ONE_WEEK,
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:'lax'
     })
}

export async function signIn(params:SignInParams){

}