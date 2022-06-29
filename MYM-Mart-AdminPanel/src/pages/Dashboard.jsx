import { AreaChartOutlined, AuditOutlined, FileProtectOutlined, FilterOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            Hello World!
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}>
          ©2022 - MYM-Mart All Copyright Reserved
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
