import React, { useState, type ReactNode, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";
import LoadingService from "./LoadingService";
import FullPageSpinner from "@/components/Loading/FullPageSpinner";

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    LoadingService.register(setLoading);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      <FullPageSpinner visible={isLoading} />
    </LoadingContext.Provider>
  );
};