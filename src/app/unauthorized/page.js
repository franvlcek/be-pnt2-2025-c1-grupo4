"use client";

import { useEffect } from "react";

export default function UnauthorizedPage() {

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/login";
    }, 5000);

    return () => clearTimeout(timer); // clean up
  }, []);

  return (
    <div >
      <h1 >403 - Unauthorized</h1>
      <p >
        You do not have permission to view this page.
      </p>
      <p >Redirecting to login...</p>
    </div>
  );
}