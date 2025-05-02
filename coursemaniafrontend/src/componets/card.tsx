import { useLocation } from "react-router-dom"

export interface CardProps{
    imageurl : string,
    title : string,
    description : string,
    price : number
    id : number
}

export const Card = ({imageurl , title  , price, id} : CardProps)=>{
    const location  = useLocation();

    const BuyCourse = async()=>{
        const Response = await fetch(`http://localhost:8000/api/v1/course/purchesecourse/${id}`, {
            method : "POST",
            headers : {
                token : localStorage.getItem("token") || "",
                'Content-Type': 'application/json'
            }
        })
        if(Response.ok){
            alert("Your Buy The Course Successfully")
        }else{
            alert("Error While Purchese! Try Again")
        }
    }
    return(
        <>
            <div className="mt-[30px]"> 
                <div className="w-[320px] h-[400px] bg-yellow-300 rounded-3xl ml-12 border-white-100 ">
                    <img className="w-[320px] h-[220px] rounded rounded-3xl" src={imageurl}></img>
                    <div className="ml-5">
                        <div><strong>Title : </strong>{title}</div>
                        <div><strong>Price</strong>$:{price}</div>
                        {location.pathname == "/dashboard/mycourse" ? <button className="bg-blue-400 w-40 rounded-lg h-10 pl-3 ml-20 mt-10 items-center">Get Details</button> : <button className="bg-blue-400 w-40 rounded-lg h-10 pl-3 ml-20 mt-10 items-center" onClick={BuyCourse}>Buy Now</button>}
                    </div>
                </div>
            </div>
        </>
    )
}
