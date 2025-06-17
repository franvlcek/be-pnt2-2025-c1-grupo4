"use client"
import User from "./User";
import UserList from "./UserList";
import { useState, useEffect } from "react";

export default function UserPage(){
    //ACA VA EL FETCH AL BACKEND CON LOS USUARIOS
    //ALMACENAR STATE
    //PASAR A USERLIST
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/user")
        .then((response) => response.json())
        .then((data) => {
            setUsers(data.message);
        })
        .catch((error) => console.log(error));
    },[]);
    
    return(
        
        <>
            <a href="/" className="card user-item__content">Back to Home</a>
            <div className="user-item__info">
                <h2>User List</h2>
            </div>
            <UserList Users={users} />
        </>
    );
}