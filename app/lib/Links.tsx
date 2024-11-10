const doctorBlogLink = (doctorId: any) => {
  return `/blog?doctorId=${doctorId}`
}



const postLink = (slug: number) => {
  return `/post/${slug}`
}



const doctorLink = (slug: number) => {
  return `/doctors/${slug}`
}



const blogLink = (search: string, page: number = 1) => {
  const searchParams = new URLSearchParams(search)
  if (page) {
    searchParams.set('page', page.toString())
  }
  return `/blog/?${searchParams.toString()}`
}



const doctorsLink = (search: string, page?: number) => {
  const searchParams = new URLSearchParams(search)

  if (page) {
    searchParams.set('page', page.toString())
  }
  return `/doctors/?${searchParams.toString()}`
}

export { doctorBlogLink, postLink, doctorLink, blogLink, doctorsLink }
