import React from 'react'
<<<<<<< HEAD

const Header = () => {
  return (
    <div>Header</div>
=======
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='glass shadow-lg playfair p-3 '>
      <div className='d-flex align-items-center justify-content-between mt-4' style={{ height: 20 }}>
        <div>
          <Link className='text-decoration-none text-black btn btn-light' to={'/'}><h6 className='m-0'>CONFRONTA I MODELLI</h6></Link>
        </div>
        <div>
          <Link className='text-decoration-none' to={'/'}><h1 className='text-white'>CARBATTLE</h1></Link>
        </div>
        <div>
          <Link className='text-decoration-none text-black btn btn-light align-middle' to={'/'}><h6 className='m-0'>IL TUO GARAGE</h6></Link>
        </div>
      </div>
    </header>
>>>>>>> f0ded2d (Nuovo inizio)
  )
}

export default Header