"use client"
import { useState, useEffect, use } from "react";
//import "../consoles.css";
import Link from "next/link";
import Image from "next/image";

export default function PageDetail({params}){
    const {id}= use(params);
    const [genre, setGenre]= useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/genre")
        .then((response) => response.json())
        .then((data) => {
            setGenre(data.message.find(genre=>genre["id"]==id));
        }).catch(error=>console.log(error));
        
    },[]);

    return(
        <>
            <a href="/genres" className="card user-item__content">Back to Genres</a>
            
            <li className="user-item">
                <div className="card user-item__content">
                    <Link href="">
                        <div className="user-item__image avatar">
                            <Image
                                src={`/img/consoleicon.png`}
                                alt="Genre avatar"
                                width={50}
                                height={100}
                            />
                        </div>
                        <div className="user-item__info">
                            <h2>{genre["genreName"]}</h2>
                        </div>
                    </Link>
                </div>
            </li>
        </>
    );
}