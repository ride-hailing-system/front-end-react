import { useEffect, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  activeKey?: string;
  pageTitle?: string;
  pageTitleDescription?: string;
  loading?: boolean;
  error?: string;
}

const Index: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user && user.firstName) {
      setFirstName(user.firstName);
    }
  }, []);

  const getActiveKey = () => {
    if (location.pathname.includes("dashboard")) return "1";
    if (location.pathname.includes("users")) return "2";
    if (location.pathname.includes("drivers")) return "3";
    if (location.pathname.includes("riders")) return "4";
    if (location.pathname.includes("rides")) return "5";
    if (location.pathname.includes("vehicles")) return "7";
    if (location.pathname.includes("setting")) return "8";
  };

  const getPageContent = () => {
    if (location.pathname.includes("dashboard")) {
      return {
      pageTitle: "Welcome, " + firstName,
      pageTitleDescription: "Overview of your account and recent activities",
      };
    }
    if (location.pathname.includes("users")) {
      return {
      pageTitle: "Users",
      pageTitleDescription: "Manage and view all registered users in the system",
      };
    }
    if (location.pathname.includes("drivers")) {
      return {
      pageTitle: "Drivers",
      pageTitleDescription: "Access details of all registered drivers",
      };
    }
    if (location.pathname.includes("riders")) {
      return {
      pageTitle: "Riders",
      pageTitleDescription: "View and manage registered riders",
      };
    }
    if (location.pathname.includes("rides")) {
      return {
      pageTitle: "Rides",
      pageTitleDescription: "Browse through the history of completed rides",
      };
    }
    if (location.pathname.includes("vehicles")) {
      return {
      pageTitle: "Vehicles",
      pageTitleDescription: "Explore the list of vehicles in the system",
      };
    }
    if (location.pathname.includes("setting")) {
      return {
      pageTitle: "Settings",
      pageTitleDescription: "Configure application preferences and settings",
      };
    }
    
    return {
      pageTitle: "",
      pageTitleDescription: "",
    };
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar activeKey={getActiveKey()} />

      <div className='flex-1 flex flex-col ml-64 relative'>
        <Header
          pageTitle={getPageContent().pageTitle}
          pageTitleDescription={getPageContent().pageTitleDescription}
        />

        <main
          className='flex-1 overflow-auto custom-scrollbar bg-white rounded-md
     p-4 flex justify-between items-center m-4'
        >
          {children}
        </main>
      </div>
    </div>
  );

};

export default Index;
