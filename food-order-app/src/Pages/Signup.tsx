import { Link, useNavigate } from "react-router-dom";
import {Button, Heading,  InputBox,  SubHeading } from "./Components/AuthComponent";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const Signup = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const navigate = useNavigate();
    return(
        <div className="bg-slate-950 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-10">
                <Heading label={"Signup"}/>  
                <SubHeading label={"Enter your infromation to create an account"}/>
                <InputBox label={"Username"} placeholder={"Enter your username.."} onChange={(e :any)=>setUsername(e.target.value)}/>
                <InputBox label={"Password"} placeholder={"Enter your password.."} onChange={(e :any)=>setPassword(e.target.value)}/>
                <InputBox label={"FirstName"} placeholder={"Enter your firstname.."} onChange={(e :any)=>setFirstName(e.target.value)}/>
                <InputBox label={"LastName"} placeholder={"Enter your lastname.."} onChange={(e :any)=>setLastName(e.target.value)}/>
                <Button label={"Signup"} onClick={()=>{
                    console.log("button clicked");
                    axios.post("http://localhost:3000/api/m3/user/signup",{
                        username,
                        password,
                        firstName,
                        lastName
                    }).then(res=>{
                        if (res) {
                            console.log(res.data);
                            toast.success("Signup Successfull..")
                            const data = res.data
                            localStorage.setItem("token",data.token);
                            const userId = localStorage.setItem("userId",data.userId);
                            localStorage.setItem("balance",data.userAccountInfo);
                            navigate("/home?id="+ userId);
                        }
                    }).catch(err=>console.error("Something Error occured!",err)
                    )
                }} />
                <div>
                    <div>Already have an Account</div>
                    <Link className="pointer underline pl-1 cursor-pointer" to={"/signin"}>
                        Signin
                    </Link>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}