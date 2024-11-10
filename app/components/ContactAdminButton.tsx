"use client";
import { useState } from "react";
import useLoginModal from "../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import apiService from "../services/apiService";
import Image from "../shared/Image";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

interface ContactAdminButtonProps {
  userId: string | null;
}

const ContactAdminButton: React.FC<ContactAdminButtonProps> = ({ userId }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const startConversationWithAdmin = async () => {
    if (userId) {
      const response = await apiService.get("/chat/api/v1/start/admin/");
      if (response.success && response.conversation) {
        router.push(`/inbox/${response.conversation.id}`);
      } else {
        // مدیریت خطا
        console.error("Failed to start conversation with admin");
      }
    } else {
      loginModal.open();
    }
  };

  return (
    <div
      onClick={startConversationWithAdmin}
      className="fixed  bottom-20 left-2 md:bottom-6 md:left-6 z-50 p-2 cursor-pointer bg-gray-300 rounded-2xl hover:bg-gray-300 transition"
    >
      <Button onClick={handleOpen} className="flex flex-col items-center justify-center">
        <Image
          alt="anline-conversation"
          src="/mantalking.svg"
          className="w-12 h-12"
        />
        <p className="text-gray-800 text-base font-light ">مکالمه آنلاین</p>
      </Button>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ContactAdminButton;
