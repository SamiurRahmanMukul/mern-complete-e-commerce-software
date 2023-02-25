import {
  AreaChartOutlined, AuditOutlined, CrownOutlined, DashboardOutlined, FileProtectOutlined, FilterOutlined, FullscreenExitOutlined, FullscreenOutlined, LogoutOutlined, SettingOutlined, TeamOutlined, UserOutlined
} from '@ant-design/icons';
import {
  Button, Layout, Menu, Tooltip
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import UserBox from '../components/shared/UserBox';
import Dashboard from '../components/tabs/Dashboard';
import Users from '../components/tabs/Users';
import useFullScreen from '../hooks/useFullScreen';
import ApiService from '../utils/apiService';
import { removeSessionAndLogoutUser } from '../utils/authentication';
import notificationWithIcon from '../utils/notification';

const {
  Header, Content, Footer, Sider
} = Layout;

function Main() {
  window.document.title = 'MYM Mart — Main';
  const { isFullscreen, toggleFullScreen } = useFullScreen();
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
        notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
        removeSessionAndLogoutUser();
      }
    } catch (error) {
      notificationWithIcon('error', 'ERROR', error?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
      removeSessionAndLogoutUser();
    }
  };

  const handleTabChange = (key) => {
    switch (key) {
      case '1': {
        navigate('/main/dashboard');
        break;
      }
      case '2': {
        navigate('/main/users');
        break;
      }
      case '3': {
        navigate('/main/categories');
        break;
      }
      case '4': {
        navigate('/main/products');
        break;
      }
      case '5': {
        navigate('/main/orders');
        break;
      }
      case '6': {
        navigate('/main/advertisements');
        break;
      }
      case '7': {
        navigate('/main/analytics');
        break;
      }
      case '8': {
        navigate('/main/profile');
        break;
      }
      case '9': {
        navigate('/main/settings');
        break;
      }
      case '10': {
        userLogout();
        break;
      }
      default: {
        navigate('/main/dashboard');
      }
    }
  };

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
        case 'advertisements': {
          setSelectedKeys('6');
          break;
        }
        case 'analytics': {
          setSelectedKeys('7');
          break;
        }
        case 'profile': {
          setSelectedKeys('8');
          break;
        }
        case 'settings': {
          setSelectedKeys('9');
          break;
        }
        case 'logout': {
          setSelectedKeys('10');
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
        window.document.title = 'MYM Mart — Advertisements';
        break;
      }
      case '7': {
        window.document.title = 'MYM Mart — Analytics';
        break;
      }
      case '8': {
        window.document.title = 'MYM Mart — Profile';
        break;
      }
      case '9': {
        window.document.title = 'MYM Mart — Settings';
        break;
      }
      case '10': {
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
              icon: <TeamOutlined />,
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
              icon: <CrownOutlined />,
              label: 'Advertisements'
            },
            {
              key: '7',
              icon: <AreaChartOutlined />,
              label: 'Analytics'
            },
            {
              key: '8',
              icon: <UserOutlined />,
              label: 'My Profile'
            },
            {
              key: '9',
              icon: <SettingOutlined />,
              label: 'Settings'
            },
            {
              key: '10',
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

          {/* full screen toggle button */}
          <Tooltip title='Click to toggle FullScreen!' placement='left'>
            <Button
              className='absolute right-5 top-5'
              icon={isFullscreen ?
                (<FullscreenExitOutlined className='pb-12' />) :
                (<FullscreenOutlined className='pb-12' />)}
              onClick={toggleFullScreen}
              shape='default'
              type='default'
              size='middle'
            />
          </Tooltip>
        </Header>

        <Content className='bg-bg-white overflow-y-scroll m-2 p-2'>
          {selectedKeys === '1' && (<Dashboard />)}
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

export default React.memo(Main);
