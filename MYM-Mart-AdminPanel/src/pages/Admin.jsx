import { AreaChartOutlined, AuditOutlined, FileProtectOutlined, FilterOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { useState } from "react";
import Analytics from "../components/tabs/Analytics";
import Catagories from "../components/tabs/Catagories";
import Dashboard from "../components/tabs/Dashboard";
import Orders from "../components/tabs/Orders";
import Products from "../components/tabs/Products";
import Users from "../components/tabs/Users";
const { Header, Content, Footer, Sider } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState("1");

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}>
      <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {/* Slider Header Section */}
        <div className="flex flex-row items-center justify-center h-[115px]"></div>

        {/* Slider Menu Section */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
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
          ]}
          onClick={(e) => setSelectedKeys(e.key)}
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
            margin: "0 16px",
          }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
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
              padding: 24,
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
          Copyright © 2022 MYM-Mart. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
