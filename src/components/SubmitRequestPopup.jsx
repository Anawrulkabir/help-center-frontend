import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosCommon from '../hooks/useAxiosCommon'

const SubmitRequestPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
  })
  const queryClient = useQueryClient()
  const axiosCommon = useAxiosCommon()

  const mutation = useMutation({
    mutationFn: async (newCard) => {
      return await axiosCommon.post('/card/create', newCard)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cards']) // Invalidate the 'cards' query to refetch the data
      onClose() // Close the popup
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-5">
      <div className="bg-white p-5 rounded-lg w-full max-w-md mx-auto relative">
        <button
          className="absolute top-2 right-2 text-lg font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add New</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded-lg"
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <span className="spinner-border spinner-border-sm">
                  {' '}
                  <img src="/spinner.png" alt="" className="animate-spin" />
                </span>
              ) : (
                'Upload'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubmitRequestPopup
