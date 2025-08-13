interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
