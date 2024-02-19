import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue} from "firebase/database"
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


export default function Login(){
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({email: "", password: ""})
    const [errors, setErrors] = React.useState("")
    const [allData, setAllData] = React.useState([])
    const [dataObj, setDataObj] = React.useState([])

    function handleChange(event){
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }

    function submit(event){
        event.preventDefault()


        const fetchData = async() => {

            const database = getDatabase()
            const dataRef = ref(database, '/')

            onValue(dataRef, (snapshot) => {
                const data = snapshot.val()
                if(data){
                    const dataList = Object.entries(data).map(([key, value]) => ({
                        key,
                        ...value
                    }))
                    setAllData(dataList)
                    // console.log(dataList)
                    setDataObj(Object.values(allData[0]))
                    // console.log("dataObj")
                    // console.log(dataObj)
                    
                }
            })
        }
        fetchData()   

        if(formData.email == '' || formData.password == ''){
            setErrors("Empty input")
            return(0)
        }
        
        else{
            for(var i = 1; i < dataObj.length; i++){
                console.log("loop" + i)
                console.log(dataObj[i])
                if(formData.email == dataObj[i].email && formData.password == dataObj[i].password){
                    console.log("user exists")
                    setErrors("loging in")
                    localStorage.setItem("userData", JSON.stringify(dataObj[i]))
                    console.log(localStorage.getItem("userData"))
                    navigate("/about")
                }
                else{
                    console.log('user does not exist')
                    setErrors("User does not exist")
                }
            }
        }

        

    }

    React.useEffect(() => {
        console.log(formData)
    }, [formData])

    return (
        <div className="page-cont">
            <div className="login-cont">
                <p className="title">Login</p>
                <form className="form" onSubmit={submit}>
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

                    <button>
                        Login
                    </button>
                </form>
                <p className="login--errors">{errors}</p>
                <Link to={"/register"} className="change-page"><p>Don't have an account?&nbsp; <span className="span-blue">Register</span></p></Link>
            </div>
        </div>
    )
}