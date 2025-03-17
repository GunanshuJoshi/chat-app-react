import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import ProfilePage from "./components/ProfilePage";
import Setting from "./components/Setting";
import SignUp from "./components/SignUp";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import Loading from "./components/Loading";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  console.log("🚀 ~ App ~ onlineUsers:", onlineUsers);
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return <Loading />;
  }

  return (
    <div data-theme={theme} className="min-h-screen no-scrollbar">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LogIn /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/settings" element={<Setting />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
