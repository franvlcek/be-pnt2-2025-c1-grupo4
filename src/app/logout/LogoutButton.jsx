"use client";
import "../styles/styles.css";

export default function LogoutButton(){
    const handleLogout = async ()=>{
        try {
            const response = await fetch("http://localhost:8080/user/logout",{
                method: "POST",
                credentials: "include",
            });

            if(response.ok){
                window.location.href = "/login";
            }else{
                console.log("Logout failed");
            }
        } catch (error) {
            console.log("Logout error", error);
        }
    };
    return(
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    )
}