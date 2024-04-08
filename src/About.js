import React from "react";

export default function About(){
    let userData = { name: "none", email: "none" };
    try{
        userData = JSON.parse(localStorage.getItem("userData"))
        console.log(userData)
    }catch(error){
        console.log("error", error)
    }
    return (
        <div className="page-cont">
            <h1>Welcome {userData.name}</h1>
            <p>email : {userData.email}</p>
        </div>
    )
}