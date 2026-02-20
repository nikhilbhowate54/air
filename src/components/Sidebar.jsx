import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../feature/auth/authSlice";
import { useDispatch } from "react-redux";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  DatabaseOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Can } from "@casl/react";
import { AbilityContext } from "../casl/AbilityContext";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);

  return (
    <Layout style={{ minHeight: "100vh",maxWidth:"180px" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        theme="dark"
        width={180} // 👈 slim width
        collapsedWidth={70} // 👈 width when collapsed
      >
        <div
          className="logo"
          style={{
            color: "white",
            padding: "16px",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Admin Panel
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["/dash"]}>
          <Menu.Item key="/dash" icon={<DashboardOutlined />}>
            <Link to="/dash">Dashboard</Link>
          </Menu.Item>

          <Can I="read" A="User" ability={ability}>
            <Menu.Item key="/user" icon={<UserOutlined />}>
              <Link to="/user">Users</Link>
            </Menu.Item>
          </Can>

          <Can I="read" A="User" ability={ability}>
            <Menu.SubMenu
              key="subscription"
              icon={<DatabaseOutlined />}
              title="Subscription"
            >
              <Menu.Item key="/subscription">
                <Link to="/subscription">Add Subscription</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Can>

          <Can I="read" a="Property" ability={ability}>
            <Menu.Item key="/property" icon={<HomeOutlined />}>
              <Link to="/property">Properties</Link>
            </Menu.Item>
          </Can>

          <Menu.Item key="bookings" icon={<DatabaseOutlined />}>
            Bookings
          </Menu.Item>
          <Menu.Item key="payments" icon={<CreditCardOutlined />}>
            Payments
          </Menu.Item>

          <Menu.SubMenu
            key="settings"
            icon={<SettingOutlined />}
            title="Settings"
          >
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              <Button
                type="text"
                style={{ color: "inherit", padding: 0 }}
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </Menu.Item>
          </Menu.SubMenu>

          <Can I="read" A="User" ability={ability}>
            <Menu.SubMenu key="manage-users" icon={<UserOutlined />} title="Manage Users">
              <Menu.Item key="/role">
                <Link to="/role">Create Role</Link>
              </Menu.Item>
              <Menu.Item key="/assign">
                <Link to="/assign">Permission Role</Link>
              </Menu.Item>
              <Menu.Item key="/assignrole">
                <Link to="/assignrole">Assign Role</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Can>
        </Menu>
      </Sider>

      {/* Main content */}
      {/* <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </Header>
        <Content style={{ margin: "20px", padding: "20px", background: "#fff" }}>
          <h2>Welcome to the Admin Dashboard</h2>
          <p>Select an option from the sidebar.</p>
        </Content>
      </Layout> */}
    </Layout>
  );
};

export default Sidebar;
