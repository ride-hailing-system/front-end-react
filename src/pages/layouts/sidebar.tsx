import { Link } from "react-router-dom";
import { useState, type JSX } from "react";
import { Icon } from "@iconify/react";
import logo from "@/assets/logo.png";

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
  onCollapsed: (value: boolean) => void;
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

const Sidebar = ({ activeKey, onSelect, onCollapsed }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-gray-900 shadow-lg transition-all duration-300 ease-in-out fixed top-0 left-0 z-10 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className='flex justify-center items-center p-4 border-b border-gray-100'>
        {collapsed ? (
          <img
            src={logo}
            width={50}
            height={50}
            title='ride hailing system logo'
          />
        ) : (
          <p className='uppercase font-bold text-white'>Smart ride hailig</p>
        )}
      </div>

      {/* Menu Items */}
      <nav className='mt-4 px-4'>
        <ul className='space-y-2'>
          {menuItems.slice(0, -1).map((item: MenuItem) => (
            <li key={item.key} title={item?.label}>
              <Link
                to={{
                  pathname: item.path,
                  search: item.role ? `?role=${item.role}` : undefined,
                }}
                className={`flex text-lg items-center px-2 py-2 rounded-md !text-white ${
                  activeKey === item.key
                    ? `!font-semibold !text-white !bg-gray-700`
                    : "hover:!bg-gray-600 hover:!font-bold"
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
              className={`flex text-lg items-center px-4 py-2 rounded-lg transition-all duration-200 !text-white ${
                activeKey === menuItems[menuItems.length - 1].key
                  ? `!font-semibold !text-white !bg-gray-700`
                  : "hover:!bg-gray-600 hover:!font-bold"
              }`}
              onClick={() => {
                onSelect(menuItems[menuItems.length - 1]);
              }}
              title={menuItems[menuItems.length - 1].label}
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
        onClick={() => {
          setCollapsed(!collapsed);
          onCollapsed(!collapsed);
        }}
        className='absolute bottom-8 right-0 transform translate-x-1/2 bg-gray-900 rounded-full p-2 shadow-md hover:shadow-lg border border-gray-100 text-gray-500 hover:text-primary transition-colors'
      >
        <Icon
          icon='ph:caret-left-light'
          width={20}
          height={20}
          className={`hover:cursor-pointer transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
          }`}
          color='white'
        />
      </button>
    </aside>
  );
};

export default Sidebar;
