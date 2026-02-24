import React from "react";
import { Toaster } from "../components/ui/toaster";
import AppRoutes from "../routes/AppRoutes";

const App: React.FC = () => {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
};

export default App;
