"use client";
import { useState } from "react";
import "../styles/styles.css";

export default function LoginPage() {
    const [formData, setFormData] = useState({email: "", password: ""});
    const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //TODO: si no es un email o password valido, mostrar mensaje de error

    const loginData = new URLSearchParams();
    loginData.append("mail",formData.email);
    loginData.append("pass",formData.password);
    try {
        const response = await fetch("http://localhost:8080/user/login", 
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded"}, 
                body : new URLSearchParams({
                  mail:formData.email,
                  pass:formData.password,
                }),
                credentials:"include",
            }
        ) 

        if(!response.ok){
            throw new Error("Sign in Error");
        }
        const data = await response.json();
        
        if(data.message){            
            //localStorage.setItem('token', data.message);
            window.location.href = "/games";
            console.log(localStorage.getItem("token"));
        }
        

    } catch (err) {
        setError(err.message || "Error while trying to connect to the server" );
    }

  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev, 
        [name]: value
    }));    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log In
          </h2>
        </div>
        
        { error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div> )
        }

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="mail" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                onChange={handleChange}                                
              />
            </div>
            <div>
              <label htmlFor="pass" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"  
                onChange={handleChange}              
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"              
            >
              Log In
            </button>
          </div>

          <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </p>
        </div>
        </form>
      </div>
    </div>
  );
}