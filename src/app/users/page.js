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
        fetch("https://raw.githubusercontent.com/ORT-PabloFernandez/PNTP2-REACT-EJEMPLO/main/src/data/Users.json")
        .then((response) => response.json())
        .then((data) => {
            setUsers(data);
        })
        .catch((error) => console.log(error));
    },[]);
    return(
        //<User ID={12345678} UserName = "Francisco" Title = "JS Dev"/>
        <>
            <UserList Users={users} />
        </>
    );
}