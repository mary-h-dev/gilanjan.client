"use client";

import useLoginModal from "../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import apiService from "../services/apiService";

interface ContactButtonProps {
  userId: string | null;
  landlordId: string;
}



const ContactButton: React.FC<ContactButtonProps> = ({
  userId,
  landlordId,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const startConversation = async () => {
    if (userId) {
      const conversation = await apiService.get(
        `/chat/api/v1/start/${landlordId}/`
      );

      if (conversation.conversation_id) {
        router.push(`/inbox/${conversation.conversation_id}`);
      }
    } else {
      loginModal.open();
    }
  };

  return (
    <div
      onClick={startConversation}
      className="mt-6 py-2 text-base px-6 font-light cursor-pointer bg-airbnbb text-white rounded-2xl hover:bg-airbnb-darkk transition"
    >
      مکالمه آنلاین
    </div>
  );
};

export default ContactButton;
