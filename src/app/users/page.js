"use client"
import User from "./User";
import UserList from "./UserList";
import { useState, useEffect } from "react";
import "../styles/styles.css";
import { useCurrentUser } from "../login/useCurrentUser";

export default function UserPage(){
    const {user, loading}= useCurrentUser();
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

    const [users, setUsers] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/user",{
            credentials:"include",
        })
        .then((response) => response.json())
        .then((data) => {
            if(typeof(data.message)== "string"){
                //Do nothing, await redirect
            }else{
                setUsers(data.message);
            }
        })
        .catch((error) => console.log(error));
    },[]);
    
    return(
        
        <>
            <header className="page-header">
                <h1>Users</h1>
                <p>All existing users on this platform, for Admin eyes only </p>
                <br></br>
                <a href="/users/create" className="generic-button">Create new User</a>
            </header>
            <UserList Users={users} />
        </>
    );
}