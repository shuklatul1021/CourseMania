import { useRef } from "react";
import { useNavigate } from "react-router-dom"

export const AdminLogin = ()=>{
    const Nevigate = useNavigate();
    const AdminSignupPageNegivate = ()=>{
        Nevigate("/adminsignup");
    }
    const adminemailRef = useRef<HTMLInputElement>(null);
    const adminPasswordRef = useRef<HTMLInputElement>(null);

    const AdminLoginCall = async()=>{
        const respone  = await fetch("https://staging-deployemnt-http.codecollabhub.xyz/api/v1/admin/login", {
            method : "POST",
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                email : adminemailRef.current?.value,
                password : adminPasswordRef.current?.value
            })
        })
        if(respone.ok){
            const data = await respone.json();
            console.log(data);
            alert("Login Successfully");
            localStorage.setItem("token" , data.token);
            Nevigate("/admindashboard")
        }else{
            alert("Try Again");
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
                        <button className="bg-white-100 rounded-lg w-[100px] h-10 mt-5 mr-5">Signup</button>
                        <button className="bg-blue-400 rounded-lg w-[110px] h-10" onClick={AdminSignupPageNegivate}>Admin Signup</button>
                    </div>
                </div>
                <hr className="bold mt-5"></hr>
                <div className="flex justify-center">
                    <div className="bg-black-100 rounded-lg w-[400px] h-[400px] mt-[80px]">
                        <div className="flex flex-col text-center mt-[30px]">
                            <h2 className="text-3xl font-semibold text-white tracking-tighter xl:text-4xl">
                                Welcome to
                                <span className="ml-2 bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">100xDevs</span>
                            </h2>
                            <p className="text-lg font-medium tracking-tighter text-primary/75 md:text-xl text-white-300 mt-2">Log in Admin Account</p>
                        </div>
                        <div className="mt-[40px] ml-[45px] text-white-100">
                            <div>
                                <label>Enter Your Email Id</label><br></br>
                                <input ref={adminemailRef} className="w-80 h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter Email" type="email"></input>
                            </div>
                            <div>
                                <label>Enter Your Password</label><br></br>
                                <input ref={adminPasswordRef} className="w-80 h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter Password" type="password"></input>
                            </div>
                            <div className="ml-[1px] mt-[20px]">
                                <button className="bg-blue-400 w-80 rounded-lg h-10 pl-3" onClick={AdminLoginCall}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}