import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { successMessage } from "../../utils/sonnerToastMessage";
import Sidebar from "./Sidebar";

const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    successMessage("Logout successful", 2000);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />

      <Layout>
        <Header style={{ padding: 0 }}>
          <Button onClick={handleLogout} className="text-white">
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
