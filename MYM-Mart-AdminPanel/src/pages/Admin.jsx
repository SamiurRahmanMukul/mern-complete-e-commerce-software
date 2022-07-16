import { AreaChartOutlined, AuditOutlined, DashboardOutlined, FileProtectOutlined, FilterOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Analytics from "../components/tabs/Analytics";
import Catagories from "../components/tabs/Catagories";
import Dashboard from "../components/tabs/Dashboard";
import Orders from "../components/tabs/Orders";
import Products from "../components/tabs/Products";
import Users from "../components/tabs/Users";
import useScreenWidth from "../hooks/useScreenWidth";
import { getSessionToken, getSessionUser } from "../utils/helperCommon";
import helperUserLogout from "../utils/helperUserLogout";
const { Header, Content, Footer, Sider } = Layout;

const Admin = () => {
  window.document.title = "MYM-Mart — Admin Panel";
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState("1");
  const screenSize = useScreenWidth();

  const sessionUser = getSessionUser();
  const sessionToken = getSessionToken();

  useEffect(() => {
    if (!sessionUser && !sessionToken) {
      navigate("/auth/login");
    }
  }, [navigate, sessionUser, sessionToken]);

  useEffect(() => {
    if (screenSize < 1020) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screenSize]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}>
      <Sider width={300} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {/* Slider Header Section */}
        {sessionUser && (
          <div className="flex flex-row items-center justify-start h-[115px]">
            <img src={sessionUser.avatar} alt="user-avatar" className="w-[60px] h-[60px] mx-2 rounded-full shadow-md" />

            {!collapsed && (
              <Tag color="default" className="text-[16px] font-bold capitalize py-2 my-1">
                {sessionUser.fullName}
              </Tag>
            )}
          </div>
        )}

        {/* Slider Menu Section */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              key: "3",
              icon: <FileProtectOutlined />,
              label: "Products",
            },
            {
              key: "4",
              icon: <FilterOutlined />,
              label: "Catagories",
            },
            {
              key: "5",
              icon: <AuditOutlined />,
              label: "Orders",
            },
            {
              key: "6",
              icon: <AreaChartOutlined />,
              label: "Analytics",
            },
            {
              key: "7",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
          onClick={(e) => {
            setSelectedKeys(e.key);
            e.key === "7" && helperUserLogout();
          }}
        />
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            textAlign: "center",
          }}>
          <h1 className="text-4xl text-primaryColor font-bold mt-3">MYM-Mart</h1>
        </Header>

        <Content
          style={{
            margin: "0 10px",
          }}>
          <Breadcrumb
            style={{
              margin: "10px 0",
            }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            {selectedKeys === "1" && <Breadcrumb.Item>Dashboard</Breadcrumb.Item>}
            {selectedKeys === "2" && <Breadcrumb.Item>Users</Breadcrumb.Item>}
            {selectedKeys === "3" && <Breadcrumb.Item>Products</Breadcrumb.Item>}
            {selectedKeys === "4" && <Breadcrumb.Item>Catagories</Breadcrumb.Item>}
            {selectedKeys === "5" && <Breadcrumb.Item>Orders</Breadcrumb.Item>}
            {selectedKeys === "6" && <Breadcrumb.Item>Analytics</Breadcrumb.Item>}
          </Breadcrumb>

          <div
            className="site-layout-background"
            style={{
              padding: 4,
              minHeight: 360,
            }}>
            {selectedKeys === "1" && <Dashboard />}
            {selectedKeys === "2" && <Users />}
            {selectedKeys === "3" && <Products />}
            {selectedKeys === "4" && <Catagories />}
            {selectedKeys === "5" && <Orders />}
            {selectedKeys === "6" && <Analytics />}
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}>
          Copyright © {new Date().getFullYear()}{" "}
          <Link to="/admin" className="text-primaryColor font-bold">
            MYM-Mart
          </Link>
          . All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
