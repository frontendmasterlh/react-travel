import styles from './SignInForm.module.css'
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../redux/user/slice'
import { useSelector, useAppDispatch } from '../../redux/hooks'

export const SignInForm: React.FC = () => {

  const navigate = useNavigate()
  const loading = useSelector(state => state.user.loading)
  const jwt = useSelector(state => state.user.token)
  const dispatch = useAppDispatch();

  useEffect(() => { 
    if (jwt !== null) {
      navigate('/')
    }
  }, [jwt])

  const onFinish = async (values: any) => {
    dispatch(signIn({
      email: values.username,
      password: values.password
    }))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles['register-form']}
    >
      <Form.Item
        label="Username"
        name="username"
        // alex1234@163.com
        // defaultValue='Fake123$'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input defaultValue='alex1234@163.com' />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password defaultValue='Fake123$' />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};