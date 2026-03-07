import { createContext } from "react";

export interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);