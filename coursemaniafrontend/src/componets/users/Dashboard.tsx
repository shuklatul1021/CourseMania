import { useLocation} from "react-router-dom"
import { AllCouseComponet } from "./CardComponent"
import { Nevbar } from "./Nevbar"
import { DasbordSlidebar } from "./Slidebar"
import { UserCouse } from "./UserCouse"

export const Dashboard = ()=>{
    const location = useLocation();
    return(
        <>
            {location.pathname=="/dashboard" ? 
            <>
                <DasbordSlidebar></DasbordSlidebar>
                <Nevbar></Nevbar>
                <AllCouseComponet></AllCouseComponet>
            </>
            :
            <>
                <DasbordSlidebar></DasbordSlidebar>
                <Nevbar></Nevbar>
                <UserCouse></UserCouse>
            </> 
            }
        </>
    )
}