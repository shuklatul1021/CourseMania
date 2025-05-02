import { useNavigate } from "react-router-dom"


export const Landingpage = ()=>{
    const nevigate = useNavigate();

    const SigninPageCall = ()=>{
        nevigate("/signup")
    }
    return(
        <>
            <div>
                dhsjhdsdskdsk<br></br>
                <button className="bg-blue-600" onClick={SigninPageCall}>Signup</button>
            </div>
        </>
    )
}