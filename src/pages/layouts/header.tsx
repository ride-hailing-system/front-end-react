import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

type HeaderProps = {
  pageTitle?: string;
  pageTitleDescription?: string;
};

const Header = ({ pageTitle, pageTitleDescription }: HeaderProps) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      className='
     flex justify-between items-center m-4'
    >
      <div className='flex flex-col'>
        <div className='text-xl  text-gray-500 font-semibold text-left'>
          {pageTitle}
        </div>
        <div className='text-lg text-gray-500 font-light'>
          {pageTitleDescription}
        </div>
      </div>
      <div className='flex items-center space-x-6'>
        {/* Notification Bell */}
        <div className='relative' ref={notificationRef}>
          <button
            className='relative text-gray-600 hover:text-primary transition-colors duration-200 cursor-pointer'
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Icon icon='mdi:bell-outline' width={30} height={30} />
            <span className='absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full'></span>
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className='absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100'>
              <div className='px-4 py-2 border-b border-gray-100'>
                <h3 className='font-semibold text-gray-800'>Notifications</h3>
              </div>
              <div className='max-h-64 overflow-y-auto'>
                <div className='px-4 py-3 hover:bg-gray-50 border-l-4 border-primary'>
                  <p className='text-sm font-medium text-gray-800'>
                    Nouveau rendez-vous
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>
                    Il y a 10 minutes
                  </p>
                </div>
              </div>
              <div className='px-4 py-2 border-t border-gray-100'>
                <Link
                  to='/admin/notifications'
                  className='text-primary text-sm font-medium hover:underline '
                >
                  Show all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className='relative' ref={dropdownRef}>
          <button
            className='flex items-center space-x-3 focus:outline-none cursor-pointer'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className='flex items-center justify-center text-gray-600'>
              <Icon icon='ei:user' width={40} height={40} />
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100'>
              <div className='px-4 py-3 border-b border-gray-100'>
                <p className='text-sm font-medium text-gray-800'>My Account</p>
                <p className='text-xs text-gray-500 mt-1'>Administrator</p>
              </div>

              <Link
                to='/admin/change-password'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:underline'
              >
                Change password
              </Link>
              <div className='border-t border-gray-100 mt-2 pt-2'>
                <button
                  onClick={handleLogout}
                  className='w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer'
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
