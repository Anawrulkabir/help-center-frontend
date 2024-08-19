import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const useAxiosCommon = () => {
  return instance
}

export default useAxiosCommon
