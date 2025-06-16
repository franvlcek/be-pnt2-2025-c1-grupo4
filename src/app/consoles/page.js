"use client"
import Console from "./Console";
import ConsoleList from "./ConsoleList";
import { useState, useEffect } from "react";

export default function UserPage(){
    //ACA VA EL FETCH AL BACKEND CON LOS USUARIOS
    //ALMACENAR STATE
    //PASAR A USERLIST
    const [consoles, setConsoles] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/console")
        .then((response) => response.json())
        .then((data) => {
            setConsoles(data.message);
        })
        .catch((error) => console.log(error));
    },[]);
    
    return(
        
        <>
            <a href="/" className="card user-item__content">Back to Home</a>
            <ConsoleList Consoles={consoles} />
        </>
    );
}