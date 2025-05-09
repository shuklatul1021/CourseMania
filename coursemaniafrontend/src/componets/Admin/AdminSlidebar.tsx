import { useNavigate } from "react-router-dom";
import { Menu } from "../../icons/menu";

export const AdminDasbordSlidebar = () => {
  const nevigate = useNavigate();

  const Allcourses = () => {
    nevigate("/admindashboard");
  };
  return (
    <>
      <div className="h-screen bg-black-600 border-2 border-gray-700 w-72 fixed left-0 top-0">
        <div className="text-red-100 flex justify-center text-4xl items-center mt-[30px] pl-3">
          {<Menu></Menu>}
          <div className="pl-2">Menu</div>
        </div>
        <hr className="mt-[27px]"></hr>
        <div className="text-white-300 text-2xl mt-2">
          <div className="pt-5 flex pl-10 hover:bg-gray-100 rounded-xl cursor-pointer">
            <button>
              <div className="mb-3"></div>
              {}
            </button>
            <div className="pl-2 pb-4" onClick={Allcourses}>
              Courses
            </div>
          </div>
          <div className="pt-5 flex pl-10 hover:bg-gray-100 rounded-xl cursor-pointer">
            <button>
              <div className="mb-3"></div>
            </button>
            <div className="pl-2 pb-4">Added Courses</div>
          </div>
          <div className="pt-5 flex pl-10 hover:bg-gray-100 rounded-xl cursor-pointer">
            <button>
              <div className="mb-3"></div>
            </button>
            <div className="pl-2 pb-4">History</div>
          </div>
        </div>
      </div>
    </>
  );
};
