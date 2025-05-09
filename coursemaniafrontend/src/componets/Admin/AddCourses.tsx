import { useRef } from "react"
import { useNavigate } from "react-router-dom";



export const AddCourses  = ()=>{
    const navigate = useNavigate();
    const CourseTitleRef  = useRef<HTMLInputElement>(null);    
    const CourseDescriptionRef  = useRef<HTMLInputElement>(null);    
    const CourseImageurlRef  = useRef<HTMLInputElement>(null);    
    const CoursePriceRef  = useRef<HTMLInputElement>(null);    
    const AddCoursesRequest = async()=>{
        const Response = await fetch("https://staging-deployemnt-http.codecollabhub.xyz/api/v1/admin/addcourses" , {
            method : "POST",
            headers : {
                token : localStorage.getItem("token") || "",
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                title : CourseTitleRef.current?.value ,
                description :  CourseDescriptionRef.current?.value , 
                price : CoursePriceRef.current?.value, 
                imageurl : CourseImageurlRef.current?.value
            })
        })
        if(Response.ok){
            alert("The Course Added Succsessfully");
            navigate(-1);
        }
    }

    return(
        <>
            <div className="bg-black-600 h-screen flex flex-wrap ml-[288px]">
                <div className="bg-black-100 rounded-lg w-[600px] h-[420px] mt-[80px] ml-[300px]">
                    <div className="text-4xl ml-[180px]">Add Courses</div>
                    <hr className="mt-[23px]"/>
                    <div className="ml-[45px] mt-[30px] text-xl">
                        <div>
                            <label>Enter The Title : </label><br></br>
                            <input ref={CourseTitleRef} className="w-[500px] h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter The Title"></input>
                        </div>
                        <div>
                            <label>Enter The Description : </label><br></br>
                            <input ref={CourseDescriptionRef} className="w-[500px] h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter The Description" ></input>
                        </div>
                        <div>
                            <label>Enter The Image Url : </label><br></br>
                            <input ref={CourseImageurlRef}  className="w-[500px] h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter The Title"></input>
                        </div>
                        <div>
                            <label>Enter The Price : </label><br></br>
                            <input ref={CoursePriceRef} className="w-[500px] h-8 rounded-lg pl-3 bg-grey-100" placeholder="Enter The Title"></input>
                        </div>
                    </div>
                    <button className="flex ml-[50px] bg-blue-300 rounded-[5px] mt-5 w-[490px] h-[40px] pl-[230px] pt-[6px]" onClick={AddCoursesRequest}>Add Course</button>
                </div>
            </div>
        </>
    )
}