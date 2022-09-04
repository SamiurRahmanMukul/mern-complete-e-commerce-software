import { LockOutlined, MailOutlined } from '@ant-design/icons';
import {
  Alert, Button, Divider, Form, Input
} from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setSessionUserAndToken } from '../utils/helpers/helperAuthentication';
import helperUserLogin from '../utils/helpers/helperUserLogin';

function Login() {
  window.document.title = 'MYM-Mart — Login';
  const [errMsg, setErrMsg] = useState('');

  const onFinish = async (values) => {
    const data = await helperUserLogin(values);
    const {
      status, msg, user, token
    } = data;

    if (status === 200) {
      setSessionUserAndToken(user, token);
      window.location.href = '/admin/dashboard';
    } else {
      setErrMsg(msg);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrMsg('');
    }, 3000);
  }, [errMsg]);

  return (
    <section className='flex flex-col h-screen items-center justify-center'>
      <div className='w-[400px] md:w-[450px]'>
        <Link to='/'>
          <h1
            className='text-3xl text-center text-primaryColor font-bold md:text-4xl hover:text-primaryColorHover'
          >
            MYM-Mart
          </h1>
        </Link>

        <Divider className='!mb-10'>LOGIN</Divider>
        {errMsg && <Alert message={errMsg} type='error' className='!text-center' />}

        <Form
          name='normal_login'
          className='login-form mt-5'
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          size='large'
        >
          <Form.Item
            name='email'
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your Email!'
              }
            ]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon mr-2' />}
              placeholder='Type here your email'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon mr-2' />}
              type='password'
              placeholder='Type here your password'
            />
          </Form.Item>

          {/* FORM SUBMIT BUTTON */}
          <Form.Item>
            <Button
              className='login-form-button'
              htmlType='submit'
              type='primary'
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default Login;
