const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center  pt-20 bg-slate-300">
      <h1 className="text-4xl md:text-6xl font-normal text-center mb-6">
        How can we help?
      </h1>
      <div className="mb-20">
        <label className="input border border-black shadow-lg flex items-center gap-2 w-96 md:min-w-[40rem]">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => console.log(e.target.value)}
          />
          <img src="/right-arrow.png" alt="" className="h-3 w-3" />
        </label>
      </div>
    </div>
  )
}

export default Hero
