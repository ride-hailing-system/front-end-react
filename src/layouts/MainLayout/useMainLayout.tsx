import { Icon } from '@iconify/react/dist/iconify.js';
import type { ReactElement } from 'react';

// Define the type for a single, clickable menu item
export type MenuItem = {
  key: string;
  icon: ReactElement;
  label: string;
  path: string;
  role?: string;
};

// Define the type for a navigation item, which can be a single item or a group
export type NavigationItem = MenuItem & {
  children?: MenuItem[];
};

export const useMainLayout = () => {
  const navItems: NavigationItem[] = [
    {
      key: '1',
      icon: <Icon icon="material-symbols:dashboard" width={30} height={30} />,
      label: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      key: '2',
      icon: <Icon icon="mdi:users" width={25} height={25} />,
      label: 'System Users',
      path: '/admin/users',
      role: 'user',
    },
    {
      key: '3',
      icon: <Icon icon="healthicons:truck-driver" width={25} height={25} />,
      label: 'Drivers',
      path: '/admin/drivers',
      role: 'driver',
    },
    {
      key: '6',
      icon: <Icon icon="raphael:users" width={25} height={25} />,
      label: 'Riders',
      path: '/admin/riders',
      role: 'rider',
    },
    {
      key: '4',
      icon: <Icon icon="mdi:car" width={30} height={30} />,
      label: 'Vehicles',
      path: '/admin/vehicles',
    },
    {
      key: '5',
      icon: <Icon icon="icon-park-solid:transaction" width={30} height={30} />,
      label: 'Rides',
      path: '/admin/rides',
    },
    {
      key: '7',
      icon: <Icon icon="ant-design:setting-filled" width={30} height={30} />,
      label: 'Setting',
      path: '/admin/setting',
    },
  ];

  return { navItems };
};
