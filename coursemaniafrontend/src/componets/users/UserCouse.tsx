import { useEffect, useState } from "react"
import { Card } from "./card";
import { Skaliton } from "../../icons/Scaliton";

export const UserCouse = ()=>{
    const [purchesecourse , setpurchesecourse] = useState([]);
    const [loading , isloading ] = useState(true);
    const GetAllPurcheseCouse = async()=>{
        isloading(true);
        const Respones = await fetch("https://staging-deployemnt-http.codecollabhub.xyz/api/v1/course/mypurchesecourse" , {
            method : "GET",
            headers : {
                'Content-Type': 'application/json',
                token : localStorage.getItem("token") || ""
            }   
        })
        const json = await Respones.json();
        setpurchesecourse(json.PurcheseData);
        isloading(false);
    }

    useEffect(()=>{
        GetAllPurcheseCouse();
    },[])
    return(
        <>
            <div className="bg-black-600 min-h-screen flex flex-wrap ml-[288px]">
                {purchesecourse.map((e, index) =>(
                    <div key={index}>
                        {loading ? <Skaliton></Skaliton> : <Card imageurl={e.imageurl} title={e.title} description={e.description} price={e.price}></Card> }
                    </div>
                ))}
            </div>
        </>
    )
}
