import { useNavigate } from "react-router-dom"

export interface Admin{
    imageurl : string,
    title : string,
    description : string,
    price : number
    id : number
}

export const Admincard = ({title, imageurl , price, id, description} : Admin)=>{
    const nevigate = useNavigate();
    const EditPage = ()=>{
        nevigate(`edit` , {
            state : {
                id,
                title,
                imageurl,
                price,
                description
            }
        });
    }
    return(
        <>
            <div className="mt-[30px]"> 
                <div className="w-[320px] h-[400px] bg-yellow-300 rounded-3xl ml-12 border-white-100 ">
                    <img className="w-[320px] h-[220px] rounded rounded-3xl" src={imageurl}></img>
                    <div className="ml-5">
                        <div><strong>Title : </strong>{title}</div>
                        <div><strong>Price</strong>$:{price}</div>
                        <button className="bg-blue-400 rounded-lg mt-[50px] ml-[70px] w-[100px] h-[30px]" onClick={EditPage}>Edit</button>
                    </div>
                </div>
            </div>
        </>
    )
}