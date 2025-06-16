"use client"
import { useState, useEffect, use } from "react";
import "../consoles.css";
import Link from "next/link";

export default function PageDetail({params}){
    const {id}= use(params);
    const [console, setConsole]= useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/console")
        .then((response) => response.json())
        .then((data) => {
            setConsole(data.message.find(console=>console["id"]==id));
        }).catch(error=>console.log(error));
        
    },[]);

    return(
        <>
            <a href="/consoles" className="card user-item__content">Back to Consoles</a>
            
            <li className="user-item">
                <div className="card user-item__content">
                    <Link href="">
                        <div className="user-item__image avatar">
                            <img src={`/img/consoleicon.png`} alt="{console.name}" />
                        </div>
                        <div className="user-item__info">
                            <h2>{console["name"]}</h2>
                        </div>
                    </Link>
                </div>
            </li>
        </>
    );
}