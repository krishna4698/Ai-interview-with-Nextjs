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
         message:"account created please signin",
       
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

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

    await setSessionCokkie(idToken);
  } catch (error: any) {
    console.log("");

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}