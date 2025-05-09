import { useEffect, useState } from "react"
import { Card } from "./card"
import { useNavigate } from "react-router-dom"

export const AllCouseComponet = ()=>{
    const navigate = useNavigate();
    const [coursedata  , setCoursedata] = useState([])
    const GetCourseDetails = async()=>{
        const response = await fetch("https://staging-deployemnt-http.codecollabhub.xyz/api/v1/course/allcourses", {
            method : "GET",
            headers : {
                token : localStorage.getItem("token") || "",
                'Content-Type': 'application/json'
            }
        })
        if(response.ok){
            const json = await response.json();
            setCoursedata(json.Data);
        }else{
            navigate(-1);
            alert("Need Token")
        }
    }
    useEffect(()=>{
        GetCourseDetails();
    }, [])
    console.log(coursedata);
    return(
        <>
            <div className="bg-black-600 h-screen flex flex-wrap ml-[288px]">
                {coursedata.map((e ,index) =>(
                    <div key={index}>
                        <Card imageurl={e.imageurl} title={e.title} description={e.description} price={e.price} id={e.id}></Card>
                    </div>
                ))}
            </div>
        </>
    )
}
