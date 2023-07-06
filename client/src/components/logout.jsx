import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedin");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location = "/";
  }, []);

  return null;
};

export default Logout;
