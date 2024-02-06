import AcademicDepartment from "../pages/Admin/AcademicSemesterManager/AcademicDepartment";
import AcademicFaculty from "../pages/Admin/AcademicSemesterManager/AcademicFaculty";
import AcademicSemester from "../pages/Admin/AcademicSemesterManager/AcademicSemester";
import CreateAcademicDepartment from "../pages/Admin/AcademicSemesterManager/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/Admin/AcademicSemesterManager/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/Admin/AcademicSemesterManager/CreateAcademicSemester";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin";
import CreateFaculty from "../pages/Admin/CreateFaculty";
import CreateStudent from "../pages/Admin/CreateStudent";

export const adminPaths = [
  { name: "Dashboard", path: "dashboard", element: <AdminDashboard /> },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create Academic Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create Academic Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create Academic Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];
