"use client";

import { useConvex, useMutation } from "convex/react";
import React, { useEffect, useContext, useState, useRef, use } from "react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { MessagesContext } from "@/context/MessagesContext";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Prompt from "@/data/Prompt";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";




function ChatView() {
  const { id } = useParams();
  const convex = useConvex();

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  
  const isProcessing = useRef(false);
  const UpdateMessages = useMutation(api.workspace.UpdateWorkspace);
  const {toggleSidebar}=useSidebar();
  const UpdateTokens=useMutation(api.users.UpdateTokens);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspaceData, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log(result);
  };

  useEffect(() => {
    if (messages?.length > 0 && !isProcessing.current && !loading) {
      const role = messages[messages.length - 1]?.role;
      if (role === "user") {
        isProcessing.current = true;
        GetAiResponse();
      }
    }
  }, [messages, loading]);

  const GetAiResponse = async () => {
    try {
      setLoading(true);
      const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
      
      const result = await axios.post("/api/ai-chat", {
        prompt: PROMPT,
      });
      console.log(result.data.result);

      const aiResp = {
        role: "AI",
        content: result.data.result,
      };

      setMessages((prev) => {
        const updatedMessages = [...prev, aiResp];
        //console.log("LEN",countToken(JSON.stringify(aiResp)));
        // Update database with the new messages array
        UpdateMessages({
          messages: updatedMessages,
          workspaceId: id,
        });

        {/*const token=Number(userDetail?.token)-Number(countToken(JSON.stringify(aiResp)));
        //update token in database
        await UpdateTokens({
          userId:userDetail?._id,
          token:token
        });*/}
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setLoading(false);
      isProcessing.current = false;
    }
  };

  const onGenerate = (input) => {
    setMessages((prev) => [...prev, {
      role: "user",
      content: input,
    }]);
    setUserInput('');
  };

  return (
    <div className="h-[85vh] flex flex-col">
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="p-4 rounded-lg flex gap-3 items-start"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            {msg?.role === "user" && (
              <Image
                src={userDetail?.picture}
                alt="userImage"
                width={35}
                height={35}
                className="rounded-full flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div
            className="p-4 rounded-lg flex gap-3 items-center"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin h-5 w-5" />
            <h2 className="text-sm">Generating response....</h2>
          </div>
        )}
      </div>

      {/* Input Section */}
       <div className="p-4 border-t">
        <div className="flex gap-2 items-end">
          {userDetail && <Image src={userDetail?.picture} alt="user" width={30} height={30} className="rounded-full cursor-pointer flex-shrink-0"
          onClick={toggleSidebar} />}
          <div
            className="p-4 border rounded-xl w-full"
            style={{
              backgroundColor: Colors.BACKGROUND,
            }}
          >
            <div className="flex gap-2 items-start">
              <textarea
                placeholder={Lookup.INPUT_PLACEHOLDER}
                onChange={(event) => setUserInput(event.target.value)}
                value={userInput}
                className="outline-none bg-transparent w-full h-24 resize-none text-sm"
              />
              {userInput && (
                <ArrowRight
                  onClick={() => onGenerate(userInput)}
                  className="bg-blue-500 p-2 h-9 w-9 rounded-md cursor-pointer flex-shrink-0 hover:bg-blue-600 transition-colors"
                />
              )}
            </div>
            <div className="mt-2">
              <Link className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;