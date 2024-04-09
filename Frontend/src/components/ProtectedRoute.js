import React, { useEffect } from "react"; // Import useEffect
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "/src/store/atoms/state.js";

export const ProtectedRoute = ({ children }) => {
  const user = useRecoilValue(authState);
  const navigate = useNavigate();
  console.log(user)

  // Use useEffect to handle navigation side-effect
  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/emowell/signin");
    }
  }, [user.isAuthenticated, navigate]); // Add dependencies here

  // If user is not authenticated, render nothing or a loading indicator
  // until useEffect can run and navigate the user away
  if (!user.isAuthenticated) {
    return null; // or a loading indicator if you prefer
  }

  return children;
};
