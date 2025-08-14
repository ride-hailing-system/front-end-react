import { use, useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './SideBar';
import { useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../../store/context/userContext';
import { useMainLayout, type MenuItem } from './useMainLayout';

interface LayoutProps {
  children: React.ReactNode;
  activeKey?: string;
  pageTitle?: string;
  pageTitleDescription?: string;
  loading?: boolean;
  error?: string;
  bgColor?: string;
}

const Index: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { '*': urlParams } = useParams();
  const { userData } = use(UserContext);

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );

  const [collapsed, setCollapsed] = useState(false);
  const { navItems: SideBarMenus } = useMainLayout();

  const getActiveKey = () => {
    if (location.pathname.includes('dashboard')) return '1';
    if (location.pathname.includes('users')) return '2';
    if (location.pathname.includes('drivers')) return '3';
    if (location.pathname.includes('driver-detail')) return '3';
    if (location.pathname.includes('vehicles')) return '4';
    if (location.pathname.includes('rides')) return '5';
    if (location.pathname.includes('riders')) return '6';
    if (location.pathname.includes('setting')) return '7';
  };

  const getPageContent = () => {
    if (location.pathname.includes('dashboard')) {
      return {
        pageTitle: 'Welcome, ' + userData?.firstName,
        pageTitleDescription: 'Overview of your account and recent activities',
      };
    }
    if (location.pathname.includes('users')) {
      return {
        pageTitle: 'Users',
        pageTitleDescription:
          'Manage and view all registered users in the system',
      };
    }
    if (location.pathname.includes('drivers')) {
      return {
        pageTitle: 'Drivers',
        pageTitleDescription: 'Access details of all registered drivers',
      };
    }
    if (location.pathname.includes('driver-detail')) {
      return {
        pageTitle: 'Driver Information',
        pageTitleDescription:
          'View detailed profile and activity of the selected driver',
      };
    }
    if (location.pathname.includes('riders')) {
      return {
        pageTitle: 'Riders',
        pageTitleDescription: 'View and manage registered riders',
      };
    }
    if (location.pathname.includes('rides')) {
      return {
        pageTitle: 'Rides',
        pageTitleDescription:
          'Browse through the history of all rides recorded',
      };
    }
    if (location.pathname.includes('vehicles')) {
      return {
        pageTitle: 'Vehicles',
        pageTitleDescription: 'Explore the list of vehicles in the system',
      };
    }
    if (location.pathname.includes('setting')) {
      return {
        pageTitle: 'Settings',
        pageTitleDescription: 'Configure application preferences and settings',
      };
    }

    return {
      pageTitle: '',
      pageTitleDescription: '',
    };
  };

  useEffect(() => {
    switch (urlParams) {
      case 'dashboard':
        setSelectedMenuItem(SideBarMenus[0]);
        break;
      case 'users':
        setSelectedMenuItem(SideBarMenus[1]);
        break;
      case 'drivers':
        setSelectedMenuItem(SideBarMenus[2]);
        break;
      case 'riders':
        setSelectedMenuItem(SideBarMenus[5]);
        break;
      case 'vehicles':
        setSelectedMenuItem(SideBarMenus[3]);
        break;
      case 'rides':
        setSelectedMenuItem(SideBarMenus[4]);
        break;
      case 'setting':
        setSelectedMenuItem(SideBarMenus[6]);
        break;
    }
  }, [urlParams]);

  const handleSelect = (item: MenuItem): void => {
    setSelectedMenuItem(item);
    console.log(selectedMenuItem);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeKey={getActiveKey()}
        onSelect={handleSelect}
        onCollapsed={(value: boolean) => {
          setCollapsed(value);
        }}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? 'ml-20' : 'ml-64'
        }  relative`}
      >
        <Header
          pageTitle={getPageContent().pageTitle}
          pageTitleDescription={getPageContent().pageTitleDescription}
          // bgColor={selectedMenuItem?.bgColor ?? ""}
        />

        <main
          className="flex-1 overflow-auto custom-scrollbar bg-white rounded-md
     p-4 mx-3"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Index;
