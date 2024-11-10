import localFont from "next/font/local";

export const yekan = localFont({
    src: [
        {
            path: "../../public/fonts/YekanBakh-Bold.woff",
            variable: "--font-bold",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/YekanBakh-Fat.woff",
            variable: "--font-fat",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/YekanBakh-Heavy.woff",
            variable: "--font-heavy",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/YekanBakh-Medium.woff",
            variable: "--font-medium",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/YekanBakh-Regular.woff",
            variable: "--font-regular",
            weight: "200",
            style: "normal",
        },
        {
            path: "../../public/fonts/YekanBakh-Light.woff",
            variable: "--font-light",
            weight: "100",
            style: "normal",
        }
    ]
});


export const convertToPersianDigits = (str) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/\d/g, (digit) => persianDigits[Number(digit)]);
  };
  
