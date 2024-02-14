import MySchedule from "../pages/Student/MySchedule";
import OfferedCourses from "../pages/Student/OfferedCourses";
import StudentDashboard from "../pages/Student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Courses",
    path: "offered-courses",
    element: <OfferedCourses />,
  },
  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule />,
  },
];
