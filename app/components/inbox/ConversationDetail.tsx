"use client";
import { useEffect, useState, useRef } from "react";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";

interface ConversationDetailProps {
  token: string;
  userId: string;
  conversation: ConversationType;
  messages: MessageType[];
}



const ConversationDetail: React.FC<ConversationDetailProps> = ({
  userId,
  token,
  messages,
  conversation,
}) => {
  const messagesDiv = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const myUser = conversation.users?.find((user) => user.id == userId);
  const otherUser = conversation.users?.find((user) => user.id != userId);
  const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  // useEffect(() => {
  //     console.log("Connection state changed", readyState);

  //     switch (readyState) {
  //         case ReadyState.CONNECTING:
  //             console.log("WebSocket is connecting...");
  //             break;
  //         case ReadyState.OPEN:
  //             console.log("WebSocket connection is open");
  //             break;
  //         case ReadyState.CLOSING:
  //             console.log("WebSocket connection is closing...");
  //             break;
  //         case ReadyState.CLOSED:
  //             console.log("WebSocket connection is closed");
  //             break;
  //         default:
  //             console.log("Unknown WebSocket state");
  //             break;
  //     }
  // }, [readyState]);

  useEffect(() => {
    console.log("myUser:", myUser);
    console.log("otherUser:", otherUser);
  }, []);

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "name" in lastJsonMessage &&
      "body" in lastJsonMessage
    ) {
      const message: MessageType = {
        id: "",
        name: lastJsonMessage.name as string,
        body: lastJsonMessage.body as string,
        sent_to: otherUser as UserType,
        created_by: myUser as UserType,
        conversationId: conversation.id,
      };

      setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
    }

    scrollToBottom();
  }, [lastJsonMessage]);

  const sendMessage = async () => {
    // console.log('sendMessage'),

    sendJsonMessage({
      event: "chat_message",
      data: {
        body: newMessage,
        name: myUser?.name,
        sent_to_id: otherUser?.id,
        conversation_id: conversation.id,
      },
    });

    setNewMessage("");

    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  const scrollToBottom = () => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center pb-6 my-6">
      <div
        ref={messagesDiv}
        className="w-full lg:w-2/4 lg:mt-4 h-[50vh] overflow-auto flex flex-col space-y-4 bg-gray-200 p-8 rounded-xl"
      >
        {messages.map((message, index: any) => (
          <div
            key={index}
            className={`w-fit py-2 px-6 rounded-xl ${
              message.created_by.name == myUser?.name
                ? "ml-[20%] bg-blue-200 "
                : "bg-red-200 ml-[30%] "
            }`}
          >
            <p className="font-bold text-gray-500">{message.created_by.name}</p>
            <p>{message.body}</p>
          </div>
        ))}

        {realtimeMessages.map((message, index) => (
          <div
            key={index}
            className={`w-fit py-2 px-6 rounded-xl ${
              message.name == myUser?.name
                ? "ml-[20%] bg-blue-200"
                : "bg-red-200 ml-[30%]"
            }`}
          >
            <p className="font-bold text-gray-500">{message.name}</p>
            <p >{message.body}</p>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-2/4 mb-6 py-4 px-4 flex flex-col border border-gray-300 space-y-2 rounded-xl">
        <input
          type="text"
          placeholder="پیام خود را تایپ کنید.."
          className="w-full min-h-[50px] p-2 bg-gray-200 rounded-xl"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <CustomButton
          label="ارسال"
          onClick={sendMessage}
          className="w-[100px]"
        />
      </div>
    </div>
  );
};

export default ConversationDetail;
