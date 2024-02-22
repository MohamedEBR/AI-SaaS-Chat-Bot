import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAi } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletetion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
  if (!user)
    return res
      .status(401)
      .json({ message: "User not registered OR Token Malfunction" });

  //grab chats of user
  const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
  chats.push({ content: message, role: "user" });
  user.chats.push({ content: message, role: "user" });

  //send all chats with the new one to openAI Api
  const config = configureOpenAi();
    const openAi = new OpenAIApi(config);
    const chatResponse = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chats
    })
    

  //get latest response
  user.chats.push(chatResponse.data.choices[0].message)
    await user.save();
    return res.status(200).json({chats: user.chats})
  } catch(err) {
    console.log(err)
    return res.status(500).json({chats: "Something went Wrong"})

  }
  
};
