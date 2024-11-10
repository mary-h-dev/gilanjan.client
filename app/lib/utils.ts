import { sliderNames } from '../constants/data'
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}





const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const convertNumbersToPersian = (str: string): string => {
  return str.replace(/\d/g, (match) => persianNumbers[parseInt(match)])
}

const isChecked = (items: Record<string, any>[], item: Record<string, any>) => {
  return items.length > 0 ?
      items?.find((checkbox: Record<string, any>) => checkbox.name === item.name)?.value
    : false
}

const isCheckedRadio = (items: Record<string, any>[], item: Record<string, any>) => {
  return items?.some((checkbox: Record<string, any>) => checkbox.value === item.value) || false
}

const doctorBooleanProperties = (doctor: Record<string, any>) => {
  return Object.entries(doctor).filter(
    ([key, value]) => typeof value === 'boolean' && value === true
  )
}

const refreshTokenDataManage = (user: Record<string, any>, data: string) => {
  localStorage.setItem(
    'user',
    JSON.stringify({ ...user, accessExpireTime: Date.now() + 3_600_000, access: data })
  )

  localStorage.setItem('currentlyLogined', 'true')
}

const secondsToTime = (secs: number) => {
  let hours = Math.floor(secs / (60 * 60))

  let divisor_for_minutes = secs % (60 * 60)
  let minutes = Math.floor(divisor_for_minutes / 60)

  let divisor_for_seconds = divisor_for_minutes % 60
  let seconds = Math.ceil(divisor_for_seconds)

  let obj = {
    h: hours,
    m: minutes,
    s: seconds,
  }
  return obj
}

const objectToUrlParams = (obj: any) => {
  const params = []

  for (const key in obj) {
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  }

  return params.join('&')
}

const findSlider = (sliders: any[], sliderName: string) => {
  return (
    sliders?.find(
      (item: any) => item.name === sliderNames[sliderName as keyof typeof sliderNames]
    ) || []
  )
}

const logOut = () => {
  localStorage.removeItem('user')
  window.location.href = '/login'
}

const getPercentage = (price: any, discountedPrice: any) => {
  const p = (discountedPrice * 100) / price
  return p.toFixed()
}

export {
  doctorBooleanProperties,
  findSlider,
  isChecked,
  isCheckedRadio,
  objectToUrlParams,
  refreshTokenDataManage,
  secondsToTime,
  logOut,
  phoneRegExp,
  getPercentage,
}
