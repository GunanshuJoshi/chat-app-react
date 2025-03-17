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
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loading loading-infinity w-20 h-20"></span>
      </div>
    );
  }

  return (
    <div data-theme={theme} className="min-h-screen min-w-screen">
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
        <Route path="/setting" element={<Setting />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
