"use client"
import Console from "./Console";
import ConsoleList from "./ConsoleList";
import { useState, useEffect } from "react";
import "../styles/styles.css";

export default function ConsolePage(){
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
            <header className="page-header">
                <h1>Consoles</h1>
                <p>Search games by Console!</p>
            </header>
            <ConsoleList Consoles={consoles} />
        </>
    );
}