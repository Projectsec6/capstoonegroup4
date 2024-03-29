
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
import { Configuration, OpenAIApi } from "openai";

<<<<<<< Updated upstream
=======
import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";
import { subscriptionCheck } from "@/lib/subscription";
>>>>>>> Stashed changes


const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt,amount=1,resolution="512x512"  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

<<<<<<< Updated upstream
=======
    const date = new Date();

    const freeTrial = await checkApiLimit();
    const isMember = await subscriptionCheck();
    if(freeTrial !== undefined && freeTrial == false && isMember!==undefined && isMember==false ) {
      return new NextResponse("Free trials are done,please check our subscription plans", { status: 403 });
    }
>>>>>>> Stashed changes
    

    const response = await openai.createImage({
     prompt,
     n: parseInt(amount,10),
     size: resolution,
    });

<<<<<<< Updated upstream
    
=======
    if(isMember==false){
      await increaseApiLimit();
    }
>>>>>>> Stashed changes

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log('[Image_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};