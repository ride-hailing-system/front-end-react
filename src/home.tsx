import Header from "./header";
import Sidebar from "./sidebar";

const Home = () => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar activeKey={"1"} />

      <div className='flex-1 flex flex-col ml-64 relative'>
        <Header
          pageTitle={"Dashboard"}
          pageTitleDescription={
            "Welcome to the admin dashboard. Here you can manage all aspects of the application."
          }
        />

        <main
          className='flex-1 overflow-auto custom-scrollbar bg-white rounded-md
     p-4 flex justify-between items-center m-4'
        >
           
        </main>
      </div>
    </div>
  );
};

export default Home;
