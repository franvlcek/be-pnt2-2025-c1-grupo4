"use client"
import { useState, useEffect, use } from "react";
import "../users.css";
import Link from "next/link";
import Image from "next/image";

export default function PageDetail({params}){
    const {id}= use(params);
    const [user, setUser]= useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/user")
        .then((response) => response.json())
        .then((data) => {
            setUser(data.message.find(user=>user["id"]==id));
        }).catch(error=>console.log(error));
        
    },[]);

    return(
        <>
            <a href="/users" className="card user-item__content">Back to Users</a>
            <ul>
            <li className="user-item">
                <div className="card user-item__content">
                    <Link href="">
                        <div className="user-item__image avatar">
                            <Image
                                src={`/img/user${user["RoleId"]}.png`}
                                alt="User avatar"
                                width={50}
                                height={100}
                            />
                        </div>
                        <div className="user-item__info">
                            <h2>{user["name"]}</h2>
                            <h3>{user["mail"]}</h3>
                        </div>
                    </Link>
                </div>
            </li>
            </ul>
        </>
    );
}