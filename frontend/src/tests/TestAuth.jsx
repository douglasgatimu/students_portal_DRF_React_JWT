import React, { useEffect } from "react";
import { UserAuth } from "../context/DRFAuthContext";

const TestAuth = () => {
  const { isAuthenticated, loading } = UserAuth();

  useEffect(() => {
    console.log("Test: IsAuthenticated?:", isAuthenticated);
    console.log("Test: Loading:", loading);
  }, [isAuthenticated, loading]);

  return (
    <div>
      {loading
        ? "Loading..."
        : isAuthenticated
          ? `Ready to log in? ${isAuthenticated}`
          : "No user logged in"}
    </div>
  );
};

export default TestAuth;
