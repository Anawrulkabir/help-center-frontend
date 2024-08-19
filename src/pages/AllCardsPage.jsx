import { useQuery } from '@tanstack/react-query'
import Card from '../components/Card'
import useAxiosCommon from '../hooks/useAxiosCommon'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const AllCardsPage = () => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const axiosCommon = useAxiosCommon()
  const {
    data: cards = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['cards', search],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/cards${search}`)
      return data
    },
  })

  // Handle form submission for search
  const handleSearch = (e) => {
    e.preventDefault()
    // Update the URL with the search query
    const params = new URLSearchParams(search)
    params.set('search', query)
    navigate(`?${params.toString()}`)
  }

  // Set the query from the URL on initial render
  useEffect(() => {
    const params = new URLSearchParams(search)
    setQuery(params.get('search') || '')
  }, [search])

  return (
    <>
      <div className="flex flex-col items-center justify-center  pt-20 bg-slate-300">
        <h1 className="text-4xl md:text-6xl font-normal text-center mb-6">
          How can we help?
        </h1>
        <div className="mb-20">
          {/* <label className="input border border-black shadow-lg flex items-center gap-2 w-96 md:min-w-[40rem]"> */}
          <form
            onSubmit={handleSearch}
            className="input border border-black shadow-lg flex items-center gap-2 w-96 md:min-w-[40rem]"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="grow"
              placeholder="Search"
            />
            <button type="submit">
              <img src="/right-arrow.png" alt="Search" className="h-3 w-3" />
            </button>
          </form>
          {/* </label> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  justify-items-center md:px-32 gap-y-6 md:gap-y-12 my-10 md:my-16 gap-8 px-6">
        {
          (isLoading && <div>Loading...</div>,
          cards.length === 0 && <div>No cards found.</div>,
          cards.map((card) => <Card key={card.id} details={card} />))
        }
      </div>
    </>
  )
}

export default AllCardsPage
