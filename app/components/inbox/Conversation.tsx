'use client';
import { useRouter } from "next/navigation";
// import { ConversationType } from "@/app/inbox/page";

export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
  };
  
  export type ConversationType = {
    id: string;
    users: UserType[];
  };


interface ConversationProps {
    conversation: ConversationType;
    userId: string;
}



const Conversation: React.FC<ConversationProps> = ({
    conversation,
    userId
}) => {
    const router = useRouter();
    const otherUser = conversation.users.find((user) => user.id != userId)

    
    return (
        <div className="w-full flex flex-col  md:flex-row gap-4 items-center justify-between p-4 cursor-pointer border border-gray-300 hover:shadow-lg rounded-xl transition-transform transform hover:-translate-y-1 m-4">
            <p className="mb-6 p-6 bg-gray-200 text-center text-xl text-gray-400 rounded-full">{otherUser?.name}</p>

            <p 
                onClick={() => router.push(`/inbox/${conversation.id}`)}
                className="text-white w-[150px] text-center font-light p-2 bg-airbnbb hover:bg-airbnb-darkk rounded-full"
            >
                برو به چت آنلاین
            </p>
        </div>
    )
}

export default Conversation;