"use client"
import { useState, useEffect, use } from "react";
import "../users.css";
import Link from "next/link";

export default function PageDetail({params}){
    const {id}= use(params);
    const [user, setUser]= useState([]);

    useEffect(()=>{
        fetch("https://raw.githubusercontent.com/ORT-PabloFernandez/PNTP2-REACT-EJEMPLO/main/src/data/Users.json")
        .then((response) => response.json())
        .then((data) => {
            setUser(data.find(user=>user["Object Id"]==id));
        }).catch(error=>console.log(error));
        
    },[]);

    return(
        <>
            <a href="/users" className="card user-item__content">Back to Users</a>
            
            <li className="user-item">
                <div className="card user-item__content">
                    <Link href="">
                        <div className="user-item__image avatar">
                            <img src={user.Picture} alt="{user.UserName}" />
                        </div>
                        <div className="user-item__info">
                            <h2>{user["Display name"]}</h2>
                            <h3>{user.Title}</h3>
                            <h3>{user.City}, {user.State}, {user["Country/Region"]}</h3>
                            <h3>{user["User principal name"]}</h3>
                            <h3>{user["Phone number"]}</h3>
                        </div>
                    </Link>
                </div>
            </li>
        </>
    );
}