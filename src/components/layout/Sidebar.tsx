import { Layout, Menu } from "antd";
import { adminPaths } from "../../router/admin.routes";
import { facultyPath } from "../../router/faculty.routes";
import { studentPaths } from "../../router/student.routes";
import { sideBarItemGenerator } from "../../utils/sideBarItemGenerator";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { TUserDate, logout } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  let sidebarItem;
  const { user: userByToken, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  let user;
  if (token) {
    user = jwtDecode(token);
  }
  const role = (user as TUserDate)?.role;

  if (role !== userByToken?.role) {
    dispatch(logout());
  }

  if (role)
    switch (role) {
      case userRole.ADMIN:
        sidebarItem = sideBarItemGenerator(adminPaths, userRole.ADMIN);
        break;
      case userRole.FACULTY:
        sidebarItem = sideBarItemGenerator(facultyPath, userRole.FACULTY);
        break;
      case userRole.STUDENT:
        sidebarItem = sideBarItemGenerator(studentPaths, userRole.STUDENT);
        break;
      default:
        break;
    }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={260}
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div className="flex items-center justify-center h-[60px]">
        <p className="text-[26px] text-white font-semibold">University</p>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItem}
      />
    </Sider>
  );
};

export default Sidebar;
