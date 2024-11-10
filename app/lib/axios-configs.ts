import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
})

const isServer = () => {
  return typeof window === 'undefined'
}

export default axiosClient



