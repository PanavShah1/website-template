import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({name: "", email: "", password: "", confirmPassword: ""})
    const [errors, setErrors] = React.useState("")

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
            console.log(formData.email)
            localStorage.setItem("userData", JSON.stringify(formData))
            console.log(localStorage.getItem("userData"))
            navigate("/about")
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
                <p className="title">Register</p>
                <form className="form" onSubmit={submit}>
                    <p>Name</p>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                        name="name"
                    />
                    <p>Email</p>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        name="email"
                    />
                    <p>Password</p>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        name="password"
                    />
                    <p>Confirm Password</p>
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Enter pasword"
                        name="confirmPassword"
                    />

                    <button>
                        REGISTER
                    </button>
                </form>
                <p className="register--errors">{errors}</p>
                <Link to={"/login"} className="change-page"><p>Already have an account?&nbsp; <span className="span-blue">Login</span></p></Link>
            </div>
        </div>
    )
}