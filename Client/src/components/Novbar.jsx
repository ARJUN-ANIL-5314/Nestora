import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Home/Nestora.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full  bg-[#edeee8] bg-opacity-50 backdrop-blur-md z-50 font-bold">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-1 rtl:space-x-reverse">
            <img src={logo} className="h-8 md:h-11 w-12 md:w-16 ml-1 p-1" alt="Logo" />
            <span className="self-center text-dark-b text-2xl md:text-3xl font-semibold whitespace-nowrap  tracking-wide ml-0">Nestora</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
             dark:text-dark-b dark:hover:bg-blue-400 dark:focus:ring-blue-600 bg-gray-50 "
            aria-expanded={isOpen}
            aria-controls="navbar-default"
          >
            <span className="sr-only">Open menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          {/* Menu items */}
          <div className={`${isOpen ? 'block' : 'hidden' } w-full md:flex md:w-auto items-center `} id="navbar-default">
            <ul
  className={`font-medium flex flex-col md:flex-row p-4 md:p-0 mt-4 border-2 border-blue-500 rounded-lg md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-opacity-10 dark:border-gray-600 
    ${isOpen ? 'bg-white' : 'bg-transparent'}
  `}
>

              {/* Home */}
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-dark-b md:p-0 md:hover:text-blue-700 hover:bg-gray-100 md:hover:bg-transparent dark:text-light-b md:dark:hover:text-dark-b
                   dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"
                  aria-current="page"
                >
                  Home
                </a>
              </li>

              {/* Services */}
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-light-b md:p-0 md:hover:text-dark-b hover:bg-gray-100 md:hover:bg-transparent dark:text-light-b md:dark:hover:text-dark-b dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"
                >
                  Services
                </a>
              </li>

              {/* Properties */}
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-light-b md:p-0 md:hover:text-dark-b hover:bg-gray-100 md:hover:bg-transparent dark:text-light-b md:dark:hover:text-dark-b dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"
                >
                  Properties
                </a>
              </li>

              {/* Contact */}
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-light-b md:p-0 md:hover:text-dark-b hover:bg-gray-100 md:hover:bg-transparent dark:text-light-b md:dark:hover:text-dark-b dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Sign up button */}
            <Link to={'./register'}>
              <button className="block w-full md:w-auto text-white bg-dark-b hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-4 md:mt-0 md:ml-12 dark:bg-dark-b dark:hover:bg-blue-700 dark:focus:ring-dark-b">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
