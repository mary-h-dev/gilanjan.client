import { getUserId } from "../lib/actions";
import apiService from "../services/apiService";
import React from "react";
import Conversation from "../components/inbox/Conversation";
import Link from "next/link";
import TextTitle from "../shared/TextTitle";

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
};

export type ConversationType = {
  id: string;
  users: UserType[];
};

const InboxPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="max-w-[1500px] h-[500px] max-auto px-6 py-12 flex justify-center">
        <p className="w-fit h-fit text-gray-600 text-center bg-red-400 p-4 border-2 border-red-800 rounded-3xl">
          برای شروع لازم است که احراز هویت شوید.
        </p>
      </main>
    );
  }

  const conversations = await apiService.get("/chat/api/v1/");

  return (
    <main className="flex flex-col gap-2 items-center max-w-[1500px] h-screen mx-auto px-6 pb-6">
      <TextTitle title="مکالمه های من : "/>
      {conversations.length > 0 ? (
        conversations.map((conversation: ConversationType) => (
          <Conversation
            userId={userId}
            key={conversation.id}
            conversation={conversation}
          />
        ))
      ) : (
        <>
          <p className="w-fit h-fit text-gray-600 text-center bg-red-200 p-4 border-2 border-airbnbb rounded-3xl">
            مکالمه‌ای برای شما وجود ندارد.
          </p>
          <Link
            href={"/"}
            className="mt-10 p-4 text-sm text-gray-400 border-b"
          >
            بازگشت به صفحه اصلی
          </Link>
        </>
      )}
    </main>
  );
};

export default InboxPage;
