import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import {  Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import LogOut from "./components/logout";
import RegisterForm from "./components/registerForm";
import PasswordResetForm from "./components/resetPasswordForm";
import PasswordResetReceivedForm from "./components/passResetReceivedForm";
import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import Setup from "./components/Setup";
import Otp from "./components/Otp";
import Reduxcheck from "./components/Reduxcheck";
import Sidebar from "./components/Sidebar";
import About from './components/pages/About';
import Analytics from './components/pages/AccountInfo';
import ProductList from './components/pages/SecurityAuth';
import Newsletter from "./components/pages/Newsletter";
import AccountInfo from "./components/pages/AccountInfo";
import SecurityAuth from "./components/pages/SecurityAuth";

const App = () => {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const logged = localStorage.getItem("loggedin");

      const decodedUser = jwtDecode(jwt);
      console.log(decodedUser, "userid");

      setUser(decodedUser);
      setLogged(logged === "true");
    } catch (ex) {}
  }, []);

  const isUserLoggedIn = user && logged;

  return (
    <>
      <NavBar
        user={user}
        logged={logged}
        authenticated={isUserLoggedIn}
      />

      <Routes>
        <Route
          path="/users/reset_password_received/:userId/:token"
          element={<PasswordResetReceivedForm />}
        />
        {isUserLoggedIn && <Route path="/logout" element={<LogOut />} />}
        <Route path="/users/reset_password" element={<PasswordResetForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/setup" element={<Setup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/getdata" element={<Reduxcheck />} />
        <Route path="/users/reset_password" element={<PasswordResetForm />} />
        {/* <Route path="/" element={<HomePage user={user} />} /> */}
      </Routes>

      {isUserLoggedIn && (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<About />} />
            <Route path="/profile/account" element={<AccountInfo />} />
            <Route path="/profile/security" element={<SecurityAuth />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile/newletter" element={<Newsletter />} />
            <Route path="/productList" element={<ProductList />} />
          </Routes>
        </Sidebar>
      )}
    </>
  );
};

export default App;
