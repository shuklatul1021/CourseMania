import { useRef } from "react";
import { useLocation, useNavigate} from "react-router-dom"

export const EditCourseDetails = ()=>{
    const location = useLocation();
    const navigate = useNavigate()
    const { title, imageurl, price, description , id } = location.state || {};
    const ForwardUrl = `https://staging-deployemnt-http.codecollabhub.xyz/api/v1/admin/editcourse/${id}`;
    const Titleref = useRef<HTMLInputElement>(null);
    const Descriptionref = useRef<HTMLInputElement>(null);
    const Imageref = useRef<HTMLInputElement>(null);
    const Priceref = useRef<HTMLInputElement>(null);
    const EditCourse = async()=>{
        try{
            console.log(ForwardUrl);
            const response = await fetch(ForwardUrl, {
                method : "PUT",
                headers : {
                    token : localStorage.getItem("token") || "",
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    title : Titleref.current?.value,
                    description : Descriptionref.current?.value,
                    price : Priceref.current?.value,
                    imageurl : Imageref.current?.value
                })
            })
            if(response.ok){
                alert("Your Course Succsessfully Edited");
                navigate(-1)
            }else{
                alert("Error While Editing")
            }
        }catch(e){
            console.log(e);
            alert("Internal Server Error")
        }
    }
    return(
        <>
            <div className="bg-black-600 h-screen flex flex-wrap ml-[288px]">
                <div className="bg-black-100 rounded-lg w-[600px] h-[420px] mt-[80px] ml-[300px]">
                    <div className="text-4xl ml-[180px]">Edit The Course</div>
                    <hr className="mt-[23px]"/>
                    <div className="ml-[45px] mt-[30px] text-xl">
                        <div>
                            <label>Enter The Title : </label><br></br>
                            <input ref={Titleref} className="w-[500px] h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter The Title"></input>
                        </div>
                        <div>
                            <label>Enter The Description : </label><br></br>
                            <input ref={Descriptionref} className="w-[500px] h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter The Description" ></input>
                        </div>
                        <div>
                            <label>Enter The Image Url : </label><br></br>
                            <input ref={Imageref} className="w-[500px] h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter The Title"></input>
                        </div>
                        <div>
                            <label>Enter The Price : </label><br></br>
                            <input ref={Priceref} className="w-[500px] h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter The Title"></input>
                        </div>
                    </div>
                    <button className="flex ml-[50px] bg-blue-300 rounded-[5px] mt-5 w-[490px] h-[40px] pl-[230px] pt-[6px]" onClick={EditCourse}>Edit Course</button>
                </div>
            </div>
        </>
    )
}