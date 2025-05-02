import { useEffect, useState } from "react"
import { Card } from "./card";

export const UserCouse = ()=>{
    const [purchesecourse , setpurchesecourse] = useState([]);
    const GetAllPurcheseCouse = async()=>{
        const Respones = await fetch("http://localhost:3000/api/v1/course/mypurchesecourse" , {
            method : "GET",
            headers : {
                'Content-Type': 'application/json',
                token : localStorage.getItem("token") || ""
            }   
        })
        const json = await Respones.json();
        setpurchesecourse(json.PurcheseData)
    }

    useEffect(()=>{
        GetAllPurcheseCouse();
    },[])
    return(
        <>
            <div className="bg-black-600 h-screen flex flex-wrap ml-[288px]">
                {purchesecourse.map((e, index) =>(
                    <div key={index}>
                        <Card imageurl={e.imageurl} title={e.title} description={e.description} price={e.price}></Card>
                    </div>
                ))}
            </div>
        </>
    )
}