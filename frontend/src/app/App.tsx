import React from "react";
import AppRoutes from "@/routes/AppRoutes";
import { LoadingProvider } from "@/contexts/loading/LoadingProvider";
import { Toaster } from "@/components/ui/toaster";

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <AppRoutes />
      <Toaster />
    </LoadingProvider>
  );
};

export default App;