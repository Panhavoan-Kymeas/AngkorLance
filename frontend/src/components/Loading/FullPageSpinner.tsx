import React from "react";
import { Spinner } from "@/components/ui/spinner";

interface FullPageSpinnerProps {
  visible: boolean;
}

const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300">
      <Spinner className="w-16 h-16 text-primary animate-spin-slow" />
      <span className="mt-4 text-white text-sm font-medium">Loading...</span>
    </div>
  );
};

export default FullPageSpinner;