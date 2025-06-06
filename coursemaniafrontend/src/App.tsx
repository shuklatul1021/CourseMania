import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./componets/Signup";
import { Login } from "./componets/LoginPage";
import { Dashboard } from "./componets/users/Dashboard";
import { AdminSignup } from "./componets/Admin/AdminSignup";
import { AdminLogin } from "./componets/Admin/AdminLogin";
import { AdminDashBoard } from "./componets/Admin/AdminDashBoad";
import { Landingpage } from "./componets/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage></Landingpage>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/adminsignup"
            element={<AdminSignup></AdminSignup>}
          ></Route>
          <Route path="/adminlogin" element={<AdminLogin></AdminLogin>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="/admindashboard"
            element={<AdminDashBoard></AdminDashBoard>}
          ></Route>
          <Route
            path="/admindashboard/edit"
            element={<AdminDashBoard></AdminDashBoard>}
          ></Route>
          <Route
            path="/admindashboard/addcourses"
            element={<AdminDashBoard></AdminDashBoard>}
          ></Route>
          <Route
            path="/dashboard/mycourse"
            element={<Dashboard></Dashboard>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
