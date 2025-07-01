import { Link } from "react-router-dom";
import { useState, type JSX } from "react";
import { Icon } from "@iconify/react";

// Define menu items type
export type MenuItem = {
  key: string;
  icon: JSX.Element;
  label: string;
  path: string;
  role?: string | undefined;
  bgColor?: string;
};

type SidebarProps = {
  activeKey?: string;
  onSelect: (item: MenuItem) => void;
};

export const menuItems: MenuItem[] = [
  {
    key: "1",
    icon: <Icon icon='material-symbols:dashboard' width={30} height={30} />,
    label: "Dashboard",
    path: "/admin/dashboard",
    bgColor: "bg-blue-400",
  },
  {
    key: "2",
    icon: <Icon icon='mdi:users' width={30} height={30} />,
    label: "System Users",
    path: "/admin/users",
    role: "user",
    bgColor: "bg-purple-400",
  },
  {
    key: "3",
    icon: <Icon icon='healthicons:truck-driver' width={30} height={30} />,
    label: "Drivers",
    path: "/admin/drivers",
    role: "driver",
    bgColor: "bg-green-400",
  },
  {
    key: "4",
    icon: <Icon icon='mdi:car' width={30} height={30} />,
    label: "Vehicles",
    path: "/admin/vehicles",
    bgColor: "bg-gray-400",
  },
  {
    key: "5",
    icon: <Icon icon='icon-park-solid:transaction' width={30} height={30} />,
    label: "Rides",
    path: "/admin/rides",
    bgColor: "bg-yellow-400",
  },
  {
    key: "6",
    icon: <Icon icon='raphael:users' width={30} height={30} />,
    label: "Riders",
    path: "/admin/riders",
    role: "rider",
    bgColor: "bg-pink-400",
  },
  {
    key: "7",
    icon: <Icon icon='ant-design:setting-filled' width={30} height={30} />,
    label: "Setting",
    path: "/admin/setting",
    bgColor: "bg-gray-400",
  },
];

const Sidebar = ({ activeKey, onSelect }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-white shadow-lg transition-all duration-300 ease-in-out fixed top-0 left-0 z-10 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className='flex justify-center items-center p-4 border-b border-gray-100'>
        <p className='uppercase font-bold text-gray-900'>Smart ride hailig</p>
      </div>

      {/* Menu Items */}
      <nav className='mt-4 px-4'>
        <ul className='space-y-2'>
          {menuItems.slice(0, -1).map((item: MenuItem) => (
            <li key={item.key}>
              <Link
                to={{
                  pathname: item.path,
                  search: item.role ? `?role=${item.role}` : undefined,
                }}
                className={`flex text-lg items-center px-4 py-2 rounded-md text-gray-500 ${
                  activeKey === item.key
                    ? `font-semibold text-white ${item.bgColor}`
                    : "hover:bg-gray-100 hover:font-bold"
                }`}
                onClick={() => {
                  onSelect(item);
                }}
              >
                <span className='flex-shrink-0'>{item.icon}</span>
                <span
                  className={`ml-3 ${
                    collapsed ? "hidden" : "block"
                  } whitespace-nowrap `}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
          <li className='absolute bottom-8 left-0 w-full'>
            <Link
              to={menuItems[menuItems.length - 1].path}
              className={`flex text-lg items-center px-4 py-2 rounded-lg transition-all duration-200 text-gray-600 ${
                activeKey === menuItems[menuItems.length - 1].key
                  ? `font-semibold text-white ${
                      menuItems[menuItems.length - 1].bgColor
                    }`
                  : "hover:bg-gray-100 hover:font-bold"
              }`}
              onClick={() => {
                onSelect(menuItems[menuItems.length - 1]);
              }}
            >
              <span className='flex-shrink-0'>
                {menuItems[menuItems.length - 1].icon}
              </span>
              <span
                className={`ml-3 ${
                  collapsed ? "hidden" : "block"
                } whitespace-nowrap transition-opacity duration-300`}
              >
                {menuItems[menuItems.length - 1].label}
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className='absolute bottom-8 right-0 transform translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg border border-gray-100 text-gray-500 hover:text-primary transition-colors'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`h-5 w-5 transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
          }`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>
    </aside>
  );
};

export default Sidebar;
