import { useNavigate } from "react-router-dom"
import { Courseicon } from "../icons/courses"
import { Menu } from "../icons/menu"
import { HistoryIcon } from "../icons/purcheseicon"
import { User } from "../icons/user"


export const DasbordSlidebar = ()=>{
    const nevigate = useNavigate();

    const MycourseRoute = ()=>{
        nevigate("/dashboard/mycourse")
    }
    const Allcourses = ()=>{
        nevigate("/dashboard")
    }
    return(
        <>
            <div className="h-screen bg-black-600 border-2 border-gray-700 w-72 fixed left-0 top-0">
                <div className="text-red-100 flex justify-center text-4xl items-center mt-[30px] pl-3">
                    {<Menu></Menu>}<div className="pl-2">Menu</div>
                </div>
                <hr className="mt-[27px]"></hr>
                <div className="text-white-300 text-2xl mt-2">
                    <button><div className="pt-5 flex pl-10 hover:bg-gray-100 rounded-xl cursor-pointer">{<Courseicon></Courseicon>}<div className="pl-2 pb-4" onClick={Allcourses}>Courses</div></div></button>
                    <button><div className="pt-5 flex pl-10 hover:bg-gray-100 rounded-xl cursor-pointer">{<User></User>}<div className="pl-2 pb-4" onClick={MycourseRoute}>My Courses</div></div></button>
                    <button><div className="pt-5 flex pl-10 hover:bg-gray-100 rounded-xl cursor-pointer">{<HistoryIcon></HistoryIcon>}<div className="pl-2 pb-4">Purchese History</div></div></button>
                </div>
            </div>
        </>
    )
}