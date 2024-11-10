import { getUserId } from "../../lib/actions";
import React, { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "../page";
import { getAccessToken } from "../../lib/actions";

export type MessageType = {
  id: string;
  name: string;
  body: string;
  conversationId: string;
  sent_to: UserType;
  created_by: UserType;
};

const ConversationPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const token = await getAccessToken();

  if (!userId || !token) {
    return (
      <main className="max-w-[1500px] h-[500px] max-auto px-6 py-12 flex justify-center">
        <p className="w-fit h-fit text-gray-600 text-center bg-red-400 p-4 border-2 border-red-800 rounded-3xl">
          برای ادامه لازم است که احراز هویت شوید!
        </p>
      </main>
    );
  }


  const conversation = await apiService.get(`/chat/api/v1/${params.id}/`);

  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <ConversationDetail
        token={token}
        userId={userId}
        messages={conversation.messages}
        conversation={conversation.conversation}
      />
    </main>
  );
};

export default ConversationPage;
