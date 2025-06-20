"use client";
import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/user/me", {
      method: "GET",
      credentials: "include", 
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.message);
      })
      .catch((err) => {
        console.error("User fetch error:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading, error };
}