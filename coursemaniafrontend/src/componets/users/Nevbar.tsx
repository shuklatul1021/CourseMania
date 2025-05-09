import { useNavigate } from "react-router-dom"

export const Nevbar = ()=>{
    const nevigate = useNavigate()
    const Logout = ()=>{
        nevigate("/")
        localStorage.removeItem("token");
    }
    return(
        <>
            <div className="bg-black-600 ml-[288px] w-2xl h-[100px] border-2 border-gray-700">
            <div className="flex justify-between">
                    <div className="flex ml-5 items-center mt-5">
                        <img src="https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg" className="w-10"></img>
                        <p className="text-[40px] ml-5 hidden bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-black tracking-tighter text-transparent min-[410px]:block">100xDevs</p>
                    </div>
                    <div >
                        <button className="bg-red-600 rounded-lg w-[100px] h-10 mt-5 mr-5" onClick={Logout}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )

}