import { useRef } from "react";
import { useNavigate} from "react-router-dom"


export const SignUp = ()=>{
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);

    const RedirectToLogin = ()=>{
        navigate("/login")
    }

    const RedrectToSignup = ()=>{
        navigate("/adminsignup")
    }
    const SignupCall = async()=>{
        try{
            const resposne = await fetch("http://localhost:3000/api/v1/users/signup" , {
                method : "POST",
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({ 
                    email : emailRef.current?.value,
                    password : passwordRef.current?.value,
                    username : usernameRef.current?.value,
                    firstname : firstnameRef.current?.value,
                    lastname : lastnameRef.current?.value
                })
            })
            if(resposne.ok){
                alert("Signup Succsefully")
                navigate("/login")
            }
        }catch(e){
            console.log(e);
            alert("Server Error Try Again After Some Time")
        }
    }
    return(
        <>
            <div className="h-screen bg-black-600">
                <div className="flex justify-between">
                    <div className="flex ml-60 items-center mt-5">
                        <img src="https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg" className="w-10"></img>
                        <p className="text-[40px] ml-5 hidden bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-black tracking-tighter text-transparent min-[410px]:block">100xDevs</p>
                    </div>
                    <div className="mr-60">
                        <button className="bg-white-100 rounded-lg w-[100px] h-10 mt-5 mr-5" onClick={RedirectToLogin}>Login</button>
                        <button className="bg-blue-400 rounded-lg w-[110px] h-10" onClick={RedrectToSignup}>Admin Sign up</button>
                    </div>
                </div>
                <hr className="bold mt-5"></hr>
                <div className="flex justify-center">
                    <div className="bg-black-100 rounded-lg w-[400px] h-[530px] mt-[80px]">
                        <div className="flex flex-col text-center mt-[30px]">
                            <h2 className="text-3xl font-semibold text-white tracking-tighter xl:text-4xl">
                                Welcome to
                                <span className="ml-2 bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">100xDevs</span>
                            </h2>
                            <p className="text-lg font-medium tracking-tighter text-primary/75 md:text-xl text-white-300 mt-2">Sign in to access paid content!</p>
                        </div>
                        <div className="mt-[40px] ml-[45px] text-white-100">
                            <div className="">
                                <label>Enter Your Email Id</label><br></br>
                                <input ref={emailRef} className="w-80 h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter Email" type="email"></input>
                            </div>
                            <div>
                                <label>Enter Your Password</label><br></br>
                                <input ref={passwordRef} className="w-80 h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter Password" type="password"></input>
                            </div>
                            <div>
                                <label>Enter Your Username</label><br></br>
                                <input ref={usernameRef} className="w-80 h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter Username"></input>
                            </div>
                            <div>
                                <label>Enter Your FirstName</label><br></br>
                                <input ref={firstnameRef} className="w-80 h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter Firstname"></input>
                            </div>
                            <div>
                                <label>Enter Your Lastname</label><br></br>
                                <input ref={lastnameRef} className="w-80 h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter Lastname"></input>
                            </div>
                            <div className="ml-[1px] mt-[20px]">
                                <button className="bg-blue-400 w-80 rounded-lg h-10 pl-3" onClick={SignupCall}>SignUp</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}