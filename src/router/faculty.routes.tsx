import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import MyCourses from "../pages/Faculty/MyCourses";
import MyStudents from "../pages/Faculty/MyStudents";

export const facultyPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Courses",
    path: "courses",
    element: <MyCourses />,
  },
  {
    path: "courses/:registerSemesterId/:courseId",
    element: <MyStudents />,
  },
];
