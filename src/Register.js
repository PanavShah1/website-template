import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwFoir0r12ayGgjq3mggBZI2d30rAOIE8",
  authDomain: "website-template-ab2ae.firebaseapp.com",
  projectId: "website-template-ab2ae",
  storageBucket: "website-template-ab2ae.appspot.com",
  messagingSenderId: "779405253378",
  appId: "1:779405253378:web:f2b878e26d94dae367401b",
  databaseURL: "https://website-template-ab2ae-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const usersDB = ref(database, "Users");


export default function Register(){


    const [formData, setFormData] = React.useState({name: "", email: "", password: "", confirmPassword: ""})
    const [errors, setErrors] = React.useState("no error")

    function handleChange(event){
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }

    function submit(event){
        event.preventDefault()
        // console.log("submit")
        console.log(formData)

        if(formData.name == '' || formData.email == '' || formData.password == '' || formData.confirmPassword == ''){
            setErrors("Empty input")
        }

        else if(formData.password == formData.confirmPassword){
            console.log("submit")
            setErrors("No errors")
            push(usersDB, formData)
        }
        else{
            setErrors("Password does not match")
        }

        

    }

    React.useEffect(() => {
        console.log(formData)
    }, [formData])

    return (
        <div className="page-cont">
            <div className="register-cont">
                <form className="form" onSubmit={submit}>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        name="name"
                    />
                    <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        name="email"
                    />
                    <input
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        name="password"
                    />
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                    />

                    <button>
                        Submit
                    </button>
                </form>
                <p className="register--errors">{errors}</p>
                <Link to={"/login"}>Login</Link>
            </div>
        </div>
    )
}