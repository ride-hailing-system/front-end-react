import { useState, useRef } from "react";

type HeaderProps = {
  pageTitle?: string;
  pageTitleDescription?: string;
};

const Header = ({ pageTitle }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  return (
    <header
      className='
     flex justify-between items-center m-4'
    >
      <div className='flex flex-col'>
        <div className='text-xl  text-gray-500 font-semibold text-left'>
          {pageTitle}
        </div>
      </div>
      <div className='flex items-center space-x-6'>
        {/* Notification Bell */}
        <div className='relative' ref={notificationRef}>
          <button
            className='h-10 w-10 relative text-gray-600 hover:text-primary transition-colors duration-200'
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>
            <span className='absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full'></span>
          </button>

          {/* Notification Dropdown */}
        </div>

        {/* User Profile */}
        <div className='relative'>
          <button
            className='flex items-center space-x-3 focus:outline-none'
            onClick={() => {}}
          >
            <div className='h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary-light text-gray-500 flex items-center justify-center ring-2 ring-primary/20'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
