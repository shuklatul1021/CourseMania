import { useLocation } from "react-router-dom";
import { AdminCourseComponent } from "./Admincouses";
import { Nevbar } from "../users/Nevbar";
import { EditCourseDetails } from "./courseedit";
import { AddCourses } from "./AddCourses";
import { AdminDasbordSlidebar } from "./AdminSlidebar";

export const AdminDashBoard = () => {
  const location = useLocation();
  if (location.pathname == "/admindashboard/edit") {
    return (
      <>
        <Nevbar></Nevbar>
        <AdminDasbordSlidebar></AdminDasbordSlidebar>
        <EditCourseDetails></EditCourseDetails>
      </>
    );
  }
  if (location.pathname == "/admindashboard/addcourses") {
    return (
      <>
        <Nevbar></Nevbar>
        <AdminDasbordSlidebar></AdminDasbordSlidebar>
        <AddCourses></AddCourses>
      </>
    );
  }

  return (
    <>
      <Nevbar></Nevbar>
      <AdminDasbordSlidebar></AdminDasbordSlidebar>
      <AdminCourseComponent></AdminCourseComponent>
    </>
  );
};
