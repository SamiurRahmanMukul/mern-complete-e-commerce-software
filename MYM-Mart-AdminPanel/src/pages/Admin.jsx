import {
  AreaChartOutlined, AuditOutlined, DashboardOutlined, FileProtectOutlined, FilterOutlined, LogoutOutlined, SettingOutlined, UserOutlined
} from '@ant-design/icons';
import {
  Breadcrumb, Layout, Menu, Tag
} from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Analytics from '../components/tabs/Analytics';
import Catagories from '../components/tabs/Catagories';
import Dashboard from '../components/tabs/Dashboard';
import Orders from '../components/tabs/Orders';
import Products from '../components/tabs/Products';
import Settings from '../components/tabs/Settings';
import Users from '../components/tabs/Users';
import useScreenSize from '../hooks/useScreenSize';
import { getSessionUser } from '../utils/helperAuthentication';

const {
  Header, Content, Footer, Sider
} = Layout;

function Admin() {
  window.document.title = 'MYM-Mart — Admin Panel';
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState('1');
  const { screenWidth } = useScreenSize();
  const sessionUser = getSessionUser();
  const navigate = useNavigate();
  const { tab } = useParams();

  const handleTabChange = (key) => {
    switch (key) {
      case '1': {
        navigate('/admin/dashboard');
        break;
      }
      case '2': {
        navigate('/admin/users');
        break;
      }
      case '3': {
        navigate('/admin/products');
        break;
      }
      case '4': {
        navigate('/admin/categories');
        break;
      }
      case '5': {
        navigate('/admin/orders');
        break;
      }
      case '6': {
        navigate('/admin/analytics');
        break;
      }
      case '7': {
        navigate('/admin/settings');
        break;
      }
      case '8': {
        // here user logout functionality implement
        break;
      }
      default: {
        navigate('/admin/dashboard');
      }
    }
  };

  useEffect(() => {
    switch (selectedKeys) {
      case '1': {
        window.document.title = 'ERC-20 Token — Dashboard';
        break;
      }
      case '2': {
        window.document.title = 'ERC-20 Token — Users';
        break;
      }
      case '3': {
        window.document.title = 'ERC-20 Token — Products';
        break;
      }
      case '4': {
        window.document.title = 'ERC-20 Token — Categories';
        break;
      }
      case '5': {
        window.document.title = 'ERC-20 Token — Orders';
        break;
      }
      case '6': {
        window.document.title = 'ERC-20 Token — Analytics';
        break;
      }
      case '7': {
        window.document.title = 'ERC-20 Token — Settings';
        break;
      }
      case '8': {
        window.document.title = 'ERC-20 Token — Logout';
        break;
      }
      default: {
        window.document.title = 'ERC-20 Token — Dashboard';
      }
    }
  }, [selectedKeys]);

  useEffect(() => {
    if (tab) {
      switch (tab) {
        case 'dashboard': {
          setSelectedKeys('1');
          break;
        }
        case 'users': {
          setSelectedKeys('2');
          break;
        }
        case 'products': {
          setSelectedKeys('3');
          break;
        }
        case 'categories': {
          setSelectedKeys('4');
          break;
        }
        case 'orders': {
          setSelectedKeys('5');
          break;
        }
        case 'analytics': {
          setSelectedKeys('6');
          break;
        }
        case 'settings': {
          setSelectedKeys('7');
          break;
        }
        case 'logout': {
          setSelectedKeys('8');
          break;
        }
        default: {
          navigate('/not-found');
        }
      }
    }
  }, [tab, navigate]);

  useEffect(() => {
    if (screenWidth < 1020) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screenWidth]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        width={300}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* Sider Header Section */}
        {sessionUser && (
          <div className='flex flex-row items-center justify-start h-[115px]'>
            <img
              className='w-[60px] h-[60px] mx-2 rounded-full shadow-md'
              src={sessionUser.avatar}
              alt='user-avatar'
            />

            {!collapsed && sessionUser && (
              <Tag
                className='text-[16px] font-bold capitalize py-2 my-1'
                color='default'
              >
                {sessionUser.fullName}
              </Tag>
            )}
          </div>
        )}

        {/* Sider Menu Section */}
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[selectedKeys]}
          onClick={(e) => {
            handleTabChange(e.key);
          }}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard'
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Users'
            },
            {
              key: '3',
              icon: <FileProtectOutlined />,
              label: 'Products'
            },
            {
              key: '4',
              icon: <FilterOutlined />,
              label: 'Catagories'
            },
            {
              key: '5',
              icon: <AuditOutlined />,
              label: 'Orders'
            },
            {
              key: '6',
              icon: <AreaChartOutlined />,
              label: 'Analytics'
            },
            {
              key: '7',
              icon: <SettingOutlined />,
              label: 'Settings'
            },
            {
              key: '8',
              icon: <LogoutOutlined />,
              label: 'Logout'
            }
          ]}
        />
      </Sider>

      <Layout className='site-layout'>
        {/* ADMIN PANEL HEADER */}
        <Header className='site-layout-background p-0 text-center'>
          <Link to='/'>
            <h1
              className='text-4xl text-primaryColor font-bold mt-3 hover:text-primaryColorHover'
            >
              MYM-Mart
            </h1>
          </Link>
        </Header>

        {/* ADMIN PANEL CONTENT */}
        <Content style={{ margin: '0 10px' }}>
          {/* ADMIN PANEL BREADCRUMB */}
          <Breadcrumb style={{ margin: '10px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            {selectedKeys === '1' && <Breadcrumb.Item>Dashboard</Breadcrumb.Item>}
            {selectedKeys === '2' && <Breadcrumb.Item>Users</Breadcrumb.Item>}
            {selectedKeys === '3' && <Breadcrumb.Item>Products</Breadcrumb.Item>}
            {selectedKeys === '4' && <Breadcrumb.Item>Catagories</Breadcrumb.Item>}
            {selectedKeys === '5' && <Breadcrumb.Item>Orders</Breadcrumb.Item>}
            {selectedKeys === '6' && <Breadcrumb.Item>Analytics</Breadcrumb.Item>}
            {selectedKeys === '7' && <Breadcrumb.Item>Settings</Breadcrumb.Item>}
          </Breadcrumb>

          {/* ADMIN PANEL TAB'S COMPONENTS */}
          <div className='site-layout-background p-4 min-h-[360px]'>
            {selectedKeys === '1' && <Dashboard />}
            {selectedKeys === '2' && <Users />}
            {selectedKeys === '3' && <Products />}
            {selectedKeys === '4' && <Catagories />}
            {selectedKeys === '5' && <Orders />}
            {selectedKeys === '6' && <Analytics />}
            {selectedKeys === '7' && <Settings />}
          </div>
        </Content>

        {/* ADMIN PANEL FOOTER */}
        <Footer style={{ textAlign: 'center' }}>
          Copyright &copy;
          {' '}
          {new Date().getFullYear()}
          {' '}
          <Link
            className='text-primaryColor font-bold'
            to='/'
          >
            MYM-Mart
          </Link>
          . All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Admin;
