import React, { createContext, useState, type ReactNode } from 'react';

export type LoadingPropsType = {
  isLoading?: boolean;
  loadingText?: string;
};

export type LoadingContextPropsType = {
  loadingData: LoadingPropsType;
  setLoadingData: (value: LoadingPropsType) => void;
};

export const LoadingContext = createContext<LoadingContextPropsType>({
  loadingData: {
    isLoading: false,
    loadingText: 'Loading',
  },
  setLoadingData: () => {},
});

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadingData, setLoadingData] = useState<LoadingPropsType>({
    isLoading: false,
    loadingText: 'Loading',
  });

  return (
    <LoadingContext.Provider value={{ loadingData, setLoadingData }}>
      {children}
    </LoadingContext.Provider>
  );
};
