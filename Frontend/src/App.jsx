import "./styles/App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ContainerLoadingSpinner from "./components/ui/containerLoadingSpinner";
/* eslint-disable no-unused-vars */

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <main className="flex-1 flex overflow-auto">
        {loading ? (
          <ContainerLoadingSpinner></ContainerLoadingSpinner>
        ) : (
          <div className="bg-[#ffffff] text-black flex-1 flex border-b border-gray-600 justify-center">
            <Outlet />
          </div>
        )}
      </main>
    </>
  );
}
