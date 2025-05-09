import { useEffect, useState } from "react";
import { Admincard } from "./Admincard";
import { useNavigate } from "react-router-dom";

export const AdminCourseComponent = () => {
  const navigate = useNavigate();
  const [admincoursedata, adminsetCoursedata] = useState([]);
  const GetCourseDetails = async () => {
    const response = await fetch(
      "https://staging-deployemnt-http.codecollabhub.xyz/api/v1/admin/alladmincourses",
      {
        method: "GET",
        headers: {
          token: localStorage.getItem("token") || "",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const json = await response.json();
      adminsetCoursedata(json.DataRows);
    } else {
      alert("Need Token");
    }
  };
  useEffect(() => {
    GetCourseDetails();
  }, []);
  const EditpageRedirect = () => {
    navigate("addcourses");
  };

  return (
    <>
      <div className="bg-black-600 min-h-screen ml-[288px] p-5">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-white-300 text-xl ml-10">
              Welcome To Admin Dashboard
            </h1>
          </div>
          <div>
            <button
              className="bg-blue-400 w-[120px] rounded-lg h-10 pl-3 ml-[700px]"
              onClick={EditpageRedirect}
            >
              Add Courses
            </button>
          </div>
        </div>

        <div className="flex flex flex-wrap gap-4">
          {admincoursedata.map((course, index) => (
            <div key={index}>
              <Admincard
                imageurl={course.imageurl}
                title={course.title}
                price={course.price}
                id={course.id}
                description={course.description}
              ></Admincard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
