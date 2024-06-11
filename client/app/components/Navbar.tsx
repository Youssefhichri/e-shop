"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import "../CSS/Navbar.css";
import Image from "next/image";
import logoutimg from "../images/log-out.png";

import { useAuth } from "./context/AuthContext";

interface DecodedToken {
  role: string;
}

const Navbar = () => {
  const [role, setRole] = useState<string>("");
  const router = useRouter();
  const { logOut } = useAuth();

  const signOut = () => {
  logOut();
  setRole('')
  
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
    console.log(token);
    
    
  });

  const handleRedirect = (path: string) => {
   router.push(path);

 };
 const isAdmin = role === "admin";

 
 if (isAdmin) {
   return null; 
 }


  return (
    <div id="navb">
      <header className="header">
        <div
          className="topBanner"
          style={{
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            padding: "10px 0",
            fontSize: "14px",
          }}
        >
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <a
            href="/home"
            style={{ color: "white", textDecoration: "underline" }}
          >
            Shop Now
          </a>
        </div>

        <nav className="main-nav">
          <div className="logo">Exclusive</div>
          <div className="nav-links">
            <a href="/home">Home</a>
            <a href="/contact">Contact</a>
            <a href="/about">About</a>
            <a href="/singUp">Sign Up</a>
            <input type="text" placeholder="What are you looking for?" />
            <div className="icons">
              {role === "buyer" && (
                <span onClick={() => handleRedirect("/wishList")}>❤️</span>
              )}
              {role === "buyer" && (
                <span onClick={() => handleRedirect("/panier")}>🛒</span>
              )}
              {role === "buyer" && (
                <span onClick={() => handleRedirect("/buyerProfile")}>👤</span>
              )}
              {role === "seller" && (
                <span onClick={() => handleRedirect("/sellerProfile")}>👤</span>
              )}
              <span onClick={signOut}>
                <Image
                  src={logoutimg}
                  alt="Login Icon"
                  className="icon-image"
                />
              </span>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;