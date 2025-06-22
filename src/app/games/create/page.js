"use client"
import { useState,useEffect } from "react";
import { useCurrentUser } from "@/app/login/useCurrentUser";

export default function GameCreatePage() {
    const {user, loading}= useCurrentUser();
    const [genres, setGenres] = useState([]);
    const [consoles, setConsoles] = useState([]);


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
  
   const [formData, setFormData] = useState({gameName: "", ConsoleId: "", GenreId: ""});
   const [error, setError] = useState("");

    useEffect(() => {
    
        fetch("http://localhost:8080/genre")
        .then((res) => res.json())
        .then((data) => setGenres(data.message));

        fetch("http://localhost:8080/console")
        .then((res) => res.json())
        .then((data) => setConsoles(data.message));
    }, []);


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
        const response = await fetch("http://localhost:8080/game" , 
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded"}, 
                body : new URLSearchParams({
                  gameName:formData.gameName,
                  ConsoleId:formData.ConsoleId,
                  GenreId:formData.GenreId,
                }),
                credentials:"include",
            }
        ) 

        if(!response.ok){
            throw new Error("Sign in Error");
        }
        const data = await response.json();
        
        if(data.success){            
            window.location.href = "/games";
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
            Add a new Game
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
              <label htmlFor="gameName" className="sr-only">Username</label>
              <input
                id="gameName"
                name="gameName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Game Name"
                onChange={handleChange}                                 
              />
            </div>
            
            <div>
            <select name="ConsoleId" value={formData.ConsoleId} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" >
                <option value="">Select Console</option>
                {consoles.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            </div>
            <div>
            <select name="GenreId" value={formData.GenreId} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" >
                <option value="">Select Genre</option>
                {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.genreName}</option>
                ))}
            </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"              
            >
              Add Game
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}