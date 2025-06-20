"use client";
import Link from "next/link";
import "../styles/styles.css";
import { useState, useEffect } from "react";
import LogoutButton from "../logout/LogoutButton";
import { useCurrentUser } from "../login/useCurrentUser";

export default function Navbar() {
    const {user}= useCurrentUser();

  return (
    <nav className="navbar">
          <a href="/">Home</a>
          {user.role ===1 && <a href="/users">Users </a> }
          <a href="/games">Games </a>
          <a href="/consoles">Consoles </a>
          <a href="/genres">Game Genres</a>
          {user.role ===1 && <a href="/comments">Comments </a> }
          {user.name ? (
                <p className="login-section" >
                    <i>Logged in as {user.name} </i>
                    <LogoutButton/>
                </p>
            ) : (
                <p className="login-button"><a href="/login">Login</a></p>
            )}
    </nav>
  );
}