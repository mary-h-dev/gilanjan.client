"use client";

import React from 'react';
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { handleLogin } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { EyeOff, Eye, Loader } from "lucide-react";
import { useSnackbar } from 'notistack';
import useAuthStore from "@/app/hooks/useAuthStore";



const LoginModal = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [showPassword, setShowPassword] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrors({});
  }, []);

  const submitLogin = async () => {
    setIsLoading(true);
    const formData = {
      email: email,
      password: password,
    };

    const response = await apiService.postWithoutToken(
      "/useraccount/api/v1/login/",
      JSON.stringify(formData)
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      enqueueSnackbar('با موفقیت وارد شدید!', { variant: 'success' });
      useAuthStore.getState().setLoggedIn(true);

      setTimeout(() => {
        loginModal.close();
        router.push("/");
      }, 2000);
    } else {
      const errorMessages: { [key: string]: string[] } = {};

      if (response.non_field_errors) {
        errorMessages.non_field_errors = response.non_field_errors;
      }
      if (response.email) {
        errorMessages.email = response.email;
      }
      if (response.password) {
        errorMessages.password = response.password;
      }

      if (Object.keys(errorMessages).length === 0) {
        errorMessages.non_field_errors = ['خطایی رخ داد. لطفاً دوباره تلاش کنید.'];
      }

      setErrors(errorMessages);
      setIsLoading(false);
      enqueueSnackbar('خطایی رخ داد. لطفاً دوباره تلاش کنید.', { variant: 'error' });
       setTimeout(() => {
         setErrors({});
        //  loginModal.close();
         router.refresh();
       }, 2000);
    }
  };

  const content = (
    <>
      <form onSubmit={(e) => { e.preventDefault(); submitLogin(); }} className="space-y-4">
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل شما"
            type="email"
            required
            className="w-full h-[45px] px-4 border border-gray-300 rounded-xl"
          />
          {errors.email && errors.email.map((error, index) => (
            <div key={`email_error_${index}`} className="text-red-500 text-sm mt-1">
              {error}
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            type={showPassword ? "text" : "password"}
            required
            className="w-full h-[45px] px-4 border border-gray-300 rounded-xl"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 bottom-4 cursor-pointer"
          >
            {showPassword ? (
              <Eye size={20} className="text-gray-400 hover:text-black" />
            ) : (
              <EyeOff size={20} className="text-gray-400 hover:text-black" />
            )}
          </span>
          {errors.password && errors.password.map((error, index) => (
            <div key={`password_error_${index}`} className="text-red-500 text-sm mt-1">
              {error}
            </div>
          ))}
        </div>

        {/* نمایش خطاهای عمومی */}
        {errors.non_field_errors && errors.non_field_errors.map((error, index) => (
          <div key={`non_field_error_${index}`} className="text-red-500 text-sm mt-1">
            {error}
          </div>
        ))}

        <CustomButton
          label={
            isLoading ? (
              <div className="flex items-center justify-center gap-x-2">
                <Loader size={24} className="animate-spin" />
              </div>
            ) : (
              "ورود "
            )
          }
          onClick={submitLogin}
        />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="ورود"
      content={content}
    />
  );
};

export default LoginModal;
