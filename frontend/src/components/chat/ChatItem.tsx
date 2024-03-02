import { Avatar, Box, Typography} from "@mui/material"
import { useAuth } from "../../context/AuthContext";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if(message.includes("```")){
    const blocks = message.split("```");
    return blocks
  }
}


function isCodeBlock(str: string) {
  const codeIndicators = ["=", ";", "{", "}", "(", ")", "[", "]", ":", "//", "#"];
  return codeIndicators.some(indicator => str.includes(indicator));
}

function guessLanguage(code: string): string {
  // Patterns for various programming languages
  const patterns = [
    { lang: "javascript", keywords: ["function", "=>", "console.log", "import", "export"] },
    { lang: "python", keywords: ["def", "self", "import", "from", "as", "lambda"] },
    { lang: "java", keywords: ["public class", "public static void", "import java."] },
    { lang: "php", keywords: ["<?php", "echo", "public function", "$this->"] },
    { lang: "sql", keywords: ["SELECT", "UPDATE", "INSERT INTO", "DELETE FROM"] },
    { lang: "csharp", keywords: ["using System;", "namespace", "public class", "void Main"] },
    { lang: "cpp", keywords: ["#include", "int main()", "std::cout", "return 0;"] },
    { lang: "ruby", keywords: ["def", "end", "class", "module"] },
    { lang: "swift", keywords: ["import Foundation", "let", "var", "func"] },
    { lang: "go", keywords: ["package main", "import", "func main()"] },
    { lang: "kotlin", keywords: ["fun main()", "val", "var", "import"] },
    { lang: "rust", keywords: ["fn main()", "let", "mut", "use"] },
    { lang: "typescript", keywords: ["interface", ": number", ": string", "import", "export"] },
    { lang: "html", keywords: ["<!DOCTYPE html>", "<html>", "<head>", "<body>"] },
    { lang: "css", keywords: ["{", "}", "px;", "color:", "background-color:"] },
    { lang: "bash", keywords: ["#!/bin/bash", "echo", "function", "if", "fi"] },
  ];

  // Check if code block contains unique keywords for each language
  for (const { lang, keywords } of patterns) {
    if (keywords.some(keyword => code.includes(keyword))) {
      return lang;
    }
  }

  // Default to plaintext if unable to guess
  return "javascript";
}
const ChatItem = ({content, role }: {content:string, role:"user" | "assistant"}) => {
    
  const messageBlocks = extractCodeFromString(content)
    const auth = useAuth();
  
    return role === "assistant" ? (<Box sx={{
    display: "flex",
    p: 2,
    bgcolor: "#004s5612",
    borderRadius: 2,
    my:1,
    gap: 2,
  }}>
    <Avatar  sx={{
        ml: "0"
    }}>
        <img src="openai.png" alt="openai" width={"30px"} />
    </Avatar>
    <Box>

      {!messageBlocks && (<Typography  sx={{ fontSize: "20px"}}>{content}</Typography>)}
      {messageBlocks &&
       messageBlocks.length &&
        messageBlocks.map((block) =>isCodeBlock(block)  ? 
        <SyntaxHighlighter style={coldarkDark} language={guessLanguage(block)}>{block}</SyntaxHighlighter> :
        <Typography  sx={{ fontSize: "20px"}}>{block}</Typography>)}
      </Box>
  </Box>) : (
  <Box sx={{
    display: "flex",
    p: 2,
    bgcolor: "#004d56",
    borderRadius: 2,
    my:2,
    gap: 2,
  }}>
    <Avatar  sx={{
        ml: "0",
        bgcolor: "black",
        color: "white"
    }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
    </Avatar>
    <Box><Typography fontSize={"20px"}>{content}</Typography></Box>
  </Box>
  )
}
export default ChatItem