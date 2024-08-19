/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { useState } from 'react'

const Card = ({ details }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }
  const { id, title, description } = details
  return (
    <>
      <div className="border bg-slate-100 rounded-xl py-3">
        <h3 className="font-extrabold border-b-2 border-zinc-200 px-5 py-1">
          {title}
        </h3>
        <p className="px-5 py-1">
          {description.length > 150
            ? description.slice(0, 150) + '...'
            : description}
          {description.length > 150 && (
            <span
              className="text-sm font-medium text-blue-500 cursor-pointer"
              onClick={togglePopup}
            >
              more
            </span>
          )}
        </p>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-6 ">
          <div className="bg-white p-5 rounded-lg max-w-md mx-auto flex items-center justify-center flex-col">
            <h2 className="text-lg font-bold mb-4 text-center">{title}</h2>
            <p className="mb-4">{description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded text-right "
              onClick={togglePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
Card.propTypes = {
  details: PropTypes.object.isRequired,
}

export default Card
