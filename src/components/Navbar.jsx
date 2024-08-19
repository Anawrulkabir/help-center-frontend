import { useState } from 'react'
import SubmitRequestPopup from './SubmitRequestPopup'

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleOpenPopup = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }
  return (
    <>
      <div className="navbar bg-zinc-950 text-zinc-100 md:px-12 px-4">
        <div className="navbar-start">
          <a className=" text-xl font-bold flex items-center  justify-center">
            <span>
              <img src="/rectangle.png" alt="" className="h-8 w-8 mr-2" />
            </span>
            Abstract
            <span className="text-2xl  font-[100] hidden md:inline-block">
              &nbsp;|&nbsp;
            </span>
            <span className="font-[300] text-base hidden md:inline-block">
              Help Center
            </span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end">
          <button
            className="border px-3 py-1 rounded-lg"
            onClick={handleOpenPopup}
          >
            Submit a request
          </button>
        </div>
      </div>
      <SubmitRequestPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </>
  )
}

export default Navbar
