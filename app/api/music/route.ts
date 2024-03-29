
// // import { Configuration, OpenAIApi } from 'openai';

// // // Configure the OpenAI API client
// // const configuration = new Configuration({
// //     apiKey: process.env.OPENAI_API_KEY,
// //   });
// //   const openai = new OpenAIApi(configuration);
// import { auth } from "@clerk/nextjs";

// import { NextResponse } from "next/server";
// import { OpenAI } from "openai";

// // Assuming you have your API key stored in an environment variable
// const apiKey = process.env.OPEN_AI_KEY;

// if (!apiKey) {
//     new NextResponse("API key is not configured",{status:500});
// }

// const openai = new OpenAI({
//     apiKey: apiKey,
// });

//   export async function POST(req:Request){
//     try{
//       const userId= auth();
//       const body = await req.json();
//       const {messages} = body;

//       console.log("these are messages",messages);

//       if(!userId){
//         return new NextResponse("No authorization",{status:401});

//       }

//       if(!messages){
//         return new NextResponse("Messages are required",{status:400});
//       }

//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages
//       });
//       console.log("I am here for api call",JSON.stringify(response));

//       return new NextResponse(JSON.stringify(response.choices[0].message.content));
//     }
//     catch(err){
//       console.log("[Error while communicating]",err);
//       return new NextResponse("Internal Error",{status:500});
//     }
//   }


import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";


<<<<<<< Updated upstream

=======
import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";
import { subscriptionCheck } from "@/lib/subscription";
>>>>>>> Stashed changes

const replicate = new Replicate({
  auth: process.env.Replicate_AI_API_KEY!,
});




export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

<<<<<<< Updated upstream
    
=======
    const freeTrial = await checkApiLimit();
    const isMember = await subscriptionCheck();
    if(freeTrial !== undefined && freeTrial == false && isMember!==undefined && isMember==false ) {
      return new NextResponse("Free trials are done,please check our subscription plans", { status: 403 });
    }
>>>>>>> Stashed changes
    

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt
        }
      }
    );

    
<<<<<<< Updated upstream
=======
    if(isMember==false){
      await increaseApiLimit();
    }
>>>>>>> Stashed changes

    return NextResponse.json(response);
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};