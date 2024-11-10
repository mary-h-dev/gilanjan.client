import {  searchParams } from '../../types/index'
import { notFound } from 'next/navigation'
import { objectToUrlParams } from './utils'
import axiosClient from './axios-configs'

const baseUrl = 'http://localhost:8000'


const postCommentBlog = async (body: any) => {
  const response = await axiosClient.post(`/blog/api/v1/bg-comments/create`, body)
  return response
}


const getBlogComments = async (blogId: string | number, page: number = 1) => {
  const search = new URLSearchParams()
  search.set('page', page.toString())
  const response = await axiosClient.get(
    `/blog/api/v1/bg-comments/${blogId}/comments?${search?.toString()}`
  )
  return response
}


const getDoctor = async (doctorId: string | number) => {
  const response = await axiosClient.get(`/doctor/api/v1/dc/${doctorId}`)
  return response
}


const getDoctors = async (searchParams?: any) => {
  const search = new URLSearchParams(searchParams)
  const response = await axiosClient.get(`/doctor/api/v1/dc?${search?.toString()}`)
  return response
}


const getSliders = async () => {
  const response = await fetch(`${baseUrl}/site_info/slider/`, {
    next: { revalidate: 1 },
    //revalidate every one hours
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  const { data } = await response.json()
  return data
}




const getBlogList = async (searchParams?: searchParams) => {
  const generatedSearch = objectToUrlParams(searchParams)
  const response = await fetch(`${baseUrl}/blog/api/v1/bg/list?${generatedSearch.toString()}`, {
    next: { revalidate: 1 },
  })

  if (!response.ok) {
    if (response.status === 404) {
      notFound()
    }

    throw new Error('Failed to fetch data')
  }
  const { data } = await response.json()
  return data
}



const getSearchBlogList = async (search: string) => {
  const response = await fetch(`${baseUrl}/blog/api/v1/bg/list?search=${search}`, {
    next: { revalidate: 1 },
    //revalidate every one hours
  })

  if (!response.ok) {
    if (response.status === 404) {
      notFound()
    }

    throw new Error('!!!!Failed to fetch data')
  }
  const { data } = await response.json()
  return data
}



const getBlogCategories = async () => {
  const response = await fetch(`${baseUrl}/blog/api/v1/blog-category/`, {
    next: { revalidate: 1 },
    //revalidate every one hours
  })

  if (!response.ok) {
    throw new Error(response.statusText || 'مشکلی در واکشی اطلاعات پیش آمده')
  }

  const { data } = await response.json()
  return data
}




export {
  getBlogCategories,
  getBlogComments,
  getBlogList,
  getDoctor,
  getDoctors,
  getSearchBlogList,
  postCommentBlog,
  getSliders,
}
