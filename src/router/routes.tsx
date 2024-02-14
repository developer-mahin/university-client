import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoutes from "../components/layout/ProtectedRoutes";
import ChangePassword from "../pages/ChangePassword";
import Login from "../pages/Login";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPath } from "./faculty.routes";
import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes role="admin">
        <App />
      </ProtectedRoutes>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoutes role="faculty">
        <App />
      </ProtectedRoutes>
    ),
    children: routeGenerator(facultyPath),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoutes role="student">
        <App />
      </ProtectedRoutes>
    ),
    children: routeGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
]);

export default router;
