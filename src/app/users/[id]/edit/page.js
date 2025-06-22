"use client"
import { useState,useEffect } from "react";
import { useCurrentUser } from "@/app/login/useCurrentUser";
import { useParams } from "next/navigation";

export default function UserEditPage() {
    const {id} = useParams();
    const {user, loading} = useCurrentUser();
    const [roles, setRoles] = useState([]);

    useEffect(()=>{
            if(loading){
                return;
            }
            if (!user) {
                window.location.href = "/unauthorized";
            } else if (user.role !== 1) {
                window.location.href = "/unauthorized";
            }
        },[user,loading])

        useEffect(() => {
    
          fetch("http://localhost:8080/role")
          .then((res) => res.json())
          .then((data) => setRoles(data.message));
        }, []);
  
   const [formData, setFormData] = useState({name: "",role: ""});
   const [error, setError] = useState("");

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev, 
        [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
        const response = await fetch(`http://localhost:8080/user/${id}` , 
            {
                method: "PUT",
                headers: { "Content-Type": "application/x-www-form-urlencoded"}, 
                body : new URLSearchParams({
                  name:formData.name,
                  RoleId:formData.role,
                }),
                credentials:"include",
            }
        ) 

        if(!response.ok){
            throw new Error("Sign in Error");
        }
        const data = await response.json();
        
        if(data.success){            
            window.location.href = `/users/${id}`;
        }
        

    } catch (err) {
        setError(err.message || "Error while trying to connect to the server" );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Edit User
          </h2>
        </div>
        
        { error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div> )
        }

        <form className="comment-form mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Username</label>
              <input
                id="name"
                name="name"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                onChange={handleChange}                                 
              />
            </div>
            {/* <div>
              <label htmlFor="mail" className="sr-only">Email</label>
              <input
                id="mail"
                name="mail"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                onChange={handleChange}                 
              />
            </div> */}
            {/* <div>
              <label htmlFor="pass" className="sr-only">Password</label>
              <input
                id="pass"
                name="pass"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}                 
              />
            </div> */}
            <select name="role" value={formData.role} onChange={handleChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" >
                <option value="">Select Role</option>
                {roles.map((g) => (
                <option key={g.id} value={g.id}>{g.roleName}</option>
                ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"              
            >
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}