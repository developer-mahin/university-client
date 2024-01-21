import { Layout, Menu } from "antd";
import { adminPaths } from "../../router/admin.routes";
import { facultyPath } from "../../router/faculty.routes";
import { studentPaths } from "../../router/student.routes";
import { sideBarItemGenerator } from "../../utils/sideBarItemGenerator";
import { useAppSelector } from "../../redux/hooks";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  let sidebarItem;
  const { user } = useAppSelector((state) => state.auth);
  const role = user?.role;

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
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60px",
        }}
      >
        <p
          style={{
            fontSize: "26px",
            color: "white",
            fontWeight: "600",
          }}
        >
          University
        </p>
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
