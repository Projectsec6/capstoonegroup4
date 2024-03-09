
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

    
    

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f",
      {
        input: {
          prompt_a: prompt
        }
      }
    );

    

    return NextResponse.json(response);
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};