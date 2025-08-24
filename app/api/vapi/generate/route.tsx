import { NextRequest } from "next/server";
import { success } from "zod";
import {generateText} from 'ai'
import { db } from "@/firebase/admin";
import {google} from "@ai-sdk/google"




// export async function POST(request:Request){
// const { type, role,level,techstack,amount,usedid}=await request.json();

// try{
// const {text :questions}= await generateText({
//     model: google("gemini-2.0-flash-001"),
//       prompt: `Prepare questions for a job interview.
//         The job role is ${role}.
//         The job experience level is ${level}.
//         The tech stack used in the job is: ${techstack}.
//         The focus between behavioural and technical questions should lean towards: ${type}.
//         The amount of questions required is: ${amount}.
//         Please return only the questions, without any additional text.
//         The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
//         Return the questions formatted like this:
//         ["Question 1", "Question 2", "Question 3"]
        
//         Thank you! <3
//     `,
// });
// const interview={
//     role:role,
//     type:type,
//     level:level,
//     techstack:techstack.split(","),
//     questions:JSON.parse(questions),
//     userId:usedid,
//     finalized:true,
//     createdAt:new Date().toISOString(),

// };
// await db.collection("interviews").add(interview);
// return Response.json({success:true},{status:200});
// }
// catch(e){
//     console.error("Error", e)
//     return Response.json({ success:false,error:e}, {status:500});
// }
// }
 
// export async function GET(){
//     return Response.json({
//         message:"hellon ji"
//     })
// }
export async function POST(request: Request) {
  try {
    console.log("✅ STEP 1: Parsing request body...");

    const { type, role, level, techstack, amount, userid } = await request.json();

    console.log("➡️ Body received:", { type, role, level, techstack, amount, userid });

    console.log("✅ STEP 2: Calling generateText...");
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare ${amount} ${type} interview questions for ${role} (${level} level).
               Tech stack: ${techstack}.
               Return only JSON array like ["Q1","Q2"].`
    });
    console.log("➡️ RAW questions:", questions);

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questions);
    } catch (err) {
      console.error("❌ JSON.parse failed:", err);
      parsedQuestions = [questions];
    }

    console.log("✅ STEP 3: Building interview...");
    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      createdAt: new Date().toISOString(),
    };
    console.log("➡️ Interview:", interview);

    console.log("✅ STEP 4: Saving to Firestore...");
    await db.collection("interviews").add(interview);

    console.log("✅ STEP 5: Success!");
    return Response.json({ success: true, interview }, { status: 200 });

  } catch (e) {
    console.error("🔥 ERROR CAUGHT:", e);
    return Response.json({ success: false, error: String(e) }, { status: 500 });
  }
}
