import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import OfferedCourse from "../pages/Faculty/OfferedCourse";

export const facultyPath = [
  { name: "Dashboard", path: "dashboard", element: <FacultyDashboard /> },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];
