import {
  AreaChartOutlined, AuditOutlined, DashboardOutlined, FileProtectOutlined, FilterOutlined, LogoutOutlined, SettingOutlined, UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import UserBox from '../components/shared/UserBox';
import Main from '../components/tabs/Main';
import Users from '../components/tabs/Users';
import ApiService from '../utils/apiService';
import { removeSessionAndLogoutUser } from '../utils/authentication';
import notificationWithIcon from '../utils/notification';

const {
  Header, Content, Footer, Sider
} = Layout;

function Dashboard() {
  window.document.title = 'MYM Mart — Dashboard';
  const [selectedKeys, setSelectedKeys] = useState('1');
  const navigate = useNavigate();
  const { tab } = useParams();

  // function to handle user logout
  const userLogout = async () => {
    try {
      const response = await ApiService.post('/api/v1/auth/logout');
      if (response?.result_code === 0) {
        removeSessionAndLogoutUser();
      } else {
        notificationWithIcon('error', 'Sorry! Something went wrong. App server error');
        removeSessionAndLogoutUser();
      }
    } catch (error) {
      notificationWithIcon('error', error?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
      removeSessionAndLogoutUser();
    }
  };

  const handleTabChange = (key) => {
    switch (key) {
      case '1': {
        navigate('/dashboard/main');
        break;
      }
      case '2': {
        navigate('/dashboard/users');
        break;
      }
      case '3': {
        navigate('/dashboard/categories');
        break;
      }
      case '4': {
        navigate('/dashboard/products');
        break;
      }
      case '5': {
        navigate('/dashboard/orders');
        break;
      }
      case '6': {
        navigate('/dashboard/analytics');
        break;
      }
      case '7': {
        navigate('/dashboard/settings');
        break;
      }
      case '8': {
        userLogout();
        break;
      }
      default: {
        navigate('/dashboard/main');
      }
    }
  };

  useEffect(() => {
    if (tab) {
      switch (tab) {
        case 'main': {
          setSelectedKeys('1');
          break;
        }
        case 'users': {
          setSelectedKeys('2');
          break;
        }
        case 'categories': {
          setSelectedKeys('3');
          break;
        }
        case 'products': {
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
    switch (selectedKeys) {
      case '1': {
        window.document.title = 'MYM Mart — Dashboard';
        break;
      }
      case '2': {
        window.document.title = 'MYM Mart — Users';
        break;
      }
      case '3': {
        window.document.title = 'MYM Mart — Categories';
        break;
      }
      case '4': {
        window.document.title = 'MYM Mart — Products';
        break;
      }
      case '5': {
        window.document.title = 'MYM Mart — Orders';
        break;
      }
      case '6': {
        window.document.title = 'MYM Mart — Analytics';
        break;
      }
      case '7': {
        window.document.title = 'MYM Mart — Settings';
        break;
      }
      case '8': {
        window.document.title = 'MYM Mart — Logout';
        break;
      }
      default: {
        window.document.title = 'MYM Mart — Dashboard';
      }
    }
  }, [selectedKeys]);

  return (
    <Layout className='w-full h-screen'>
      <Sider width={250} breakpoint='lg' collapsedWidth='0'>
        <UserBox />

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
              icon: <FilterOutlined />,
              label: 'Catagories'
            },
            {
              key: '4',
              icon: <FileProtectOutlined />,
              label: 'Products'
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

      <Layout>
        <Header className='p-0 !bg-bg-white'>
          <Link to='/'>
            <img
              className='w-[120px] h-[60px] mx-auto'
              alt='mym-mart-logo'
              src={Logo}
            />
          </Link>
        </Header>

        <Content className='m-2 !bg-bg-white'>
          {selectedKeys === '1' && (<Main />)}
          {selectedKeys === '2' && (<Users />)}
        </Content>

        <Footer className='text-center font-text-font font-medium '>
          ©2023 MYM Mart — Developed By
          {' '}
          <a
            className='text-color-primary hover:text-color-secondary'
            href='http://www.samiurrahmanmukul.epizy.com'
            target='_blank'
            rel='noreferrer'
          >
            Samiur Rahman Mukul

          </a>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
