export default function Footer() {

  const year = new Date().getFullYear()
  return (
    <footer className='w-full py-12 bg-black text-[#f2f6ff]'>
      <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8'>
        <div>
          <h3 className='font-bold text-lg'>Distinguished Scholars Academy</h3>
          <p className='text-[#f2f6ff] mt-3'>
            We help you learn the right way, fast and effectively.
          </p>
        </div>

        <div>
          <h4 className='font-semibold'>Explore</h4>
          <ul className='mt-2 space-y-2 text-[#f2f6ff]'>
            <li>Courses</li>
            <li>About Us</li>
            <li>Blog</li>
            <li>Scholarship</li>
          </ul>
        </div>

        <div>
          <h4 className='font-semibold'>Legal</h4>
          <ul className='mt-2 space-y-2 text-[#f2f6ff]'>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className='font-semibold'>Newsletter</h4>
          <input
            className='w-full px-4 py-2 rounded mt-3 text-black'
            placeholder='Enter Email'
          />
          <button className='mt-3 w-full px-4 py-2 bg-[#FCB900] text-black font-semibold rounded hover:bg-[#002EFF] hover:text-white'>
            Subscribe
          </button>
        </div>
      </div>

      <p className='text-center text-[#f2f6ff] mt-10'>
        <span aria-hidden>©</span> <time dateTime={String(year)}>{year}</time>{' '}
        <span className='font-semibold'>Distinguished Scholars Academy</span>.
        All rights reserved.
      </p>
    </footer>
  )
}
