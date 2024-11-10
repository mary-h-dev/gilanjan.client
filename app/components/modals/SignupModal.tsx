"use client";
import React from "react";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import { EyeOff, Eye, Loader } from "lucide-react";
import { useSnackbar } from 'notistack';

const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); 
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrors({});
  }, []);

  const submitSignup = async () => {
    setIsLoading(true);
    const formData = {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
    };

    const response = await apiService.postWithoutToken(
      "/useraccount/api/v1/register/",
      JSON.stringify(formData)
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      enqueueSnackbar('ثبت‌نام با موفقیت انجام شد!', { variant: 'success' });
      setTimeout(() => {
        signupModal.close();
        router.push("/");
      }, 2000);
    } else {
      const errorMessages: { [key: string]: string[] } = {};

      // جمع‌آوری خطاهای مربوط به هر فیلد
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          errorMessages[key] = response[key];
        }
      }

      if (Object.keys(errorMessages).length === 0) {
        errorMessages.non_field_errors = ['خطایی رخ داد. لطفاً دوباره تلاش کنید.'];
      }

      setErrors(errorMessages);
      setIsLoading(false);
      enqueueSnackbar('خطایی رخ داد. لطفاً دوباره تلاش کنید.', { variant: 'error' });

       setTimeout(() => {
         setErrors({});
        // signupModal.close();
        router.refresh();
      }, 2000);
    }
  };

  const content = (
    <>
      <form onSubmit={(e) => { e.preventDefault(); submitSignup(); }} className="space-y-4">
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

        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="نام کاربری شما"
            type="text"
            required
            className="w-full h-[45px] px-4 border border-gray-300 rounded-xl"
          />
          {errors.username && errors.username.map((error, index) => (
            <div key={`username_error_${index}`} className="text-red-500 text-sm mt-1">
              {error}
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
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
          {errors.password1 && errors.password1.map((error, index) => (
            <div key={`password1_error_${index}`} className="text-red-500 text-sm mt-1">
              {error}
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="تکرار رمز عبور"
            type={showPasswordConfirm ? "text" : "password"}
            required
            className="w-full h-[45px] px-4 border border-gray-300 rounded-xl"
          />
          <span
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            className="absolute left-4 bottom-4 cursor-pointer"
          >
            {showPasswordConfirm ? (
              <Eye size={20} className="text-gray-400 hover:text-black" />
            ) : (
              <EyeOff size={20} className="text-gray-400 hover:text-black" />
            )}
          </span>
          {errors.password2 && errors.password2.map((error, index) => (
            <div key={`password2_error_${index}`} className="text-red-500 text-sm mt-1">
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
              "ثبت نام"
            )
          }
          onClick={submitSignup}
        />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="ثبت نام"
      content={content}
    />
  );
};

export default SignupModal;
