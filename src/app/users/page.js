"use client"
import User from "./User";
import UserList from "./UserList";
import { useState, useEffect } from "react";
import "../styles/styles.css";

export default function UserPage(){
    fetch("http://localhost:8080/user/me",{
            method: "GET",
            credentials: "include",
        }).then((res)=>res.json()).then((data)=>{
            if(data.message.role !==1){
                window.location.href = "/unauthorized";
            }
        }).catch((error) => console.log(error));

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
            <header className="page-header">
                <h1>Users</h1>
                <p>All existing users on this platform, for Admin eyes only </p>
            </header>
            <UserList Users={users} />
        </>
    );
}