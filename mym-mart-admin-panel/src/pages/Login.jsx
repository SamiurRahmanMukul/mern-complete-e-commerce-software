import { LockOutlined, MailOutlined } from '@ant-design/icons';
import {
  Alert, Button, Divider, Form, Input
} from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTimeout from '../hooks/useTimeout';

function Login() {
  window.document.title = 'MYM Mart — Login';
  const [errMsg, setErrMsg] = useState('');

  // timeout callback
  const [timeout] = useTimeout(() => {
    setErrMsg('');
  }, 2000);

  timeout();

  const onFinish = (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <section className='flex flex-col h-screen items-center justify-center'>
      <div className='w-[90%] md:w-[450px]'>
        <Link to='/'>
          <h2 className='app-branding-text'>
            MYM Mart
          </h2>
        </Link>

        <Divider className='!mb-10'>LOGIN AUTHORIZED USER ONLY</Divider>
        {errMsg && <Alert message={errMsg} type='error' className='!text-center' />}

        <Form
          name='mym-mart-login'
          className='login-form mt-5'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size='large'
        >
          <Form.Item
            name='email'
            rules={[{
              type: 'email',
              required: true,
              message: 'Please input your Email!'
            }]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon mr-2' />}
              placeholder='Enter here your email'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{
              required: true,
              message: 'Please input your Password!'
            }]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon mr-2' />}
              placeholder='Enter here your password'
              type='password'
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
