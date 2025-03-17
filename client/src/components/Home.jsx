import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const { authUser } = useAuthStore();
  console.log("🚀 ~ Home ~ authUser:", authUser);
  
  return <div>Home</div>;
};

export default Home;
