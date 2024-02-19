import React from "react";

export default function About(){

    const userData = JSON.parse(localStorage.getItem("userData"))
    console.log(userData)
    return (
        <div className="page-cont">
            <h1>Welcome {userData.name}</h1>
            <p>email : {userData.email}</p>
        </div>
    )
}