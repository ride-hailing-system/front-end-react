import { Form, Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../../../graphql/queries/auth';
import toast from 'react-hot-toast';
import PasswordInput from '../../../components/PasswordInput';
import { useContext } from 'react';
import { UserContext } from '../../../store/context/userContext';
import { useGraphQLQuery } from '../../../hooks/useGraphQL';

const LoginForm = () => {
  const navigate = useNavigate();

  const { runQuery: login, loading } = useGraphQLQuery({
    queryStr: LOGIN_USER,
    onSuccess: (data: any) => {
      const tmp = data.login;
      setUserData(tmp);

      if (['admin', 'user'].includes(tmp.role)) {
        toast.success('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      } else {
        // For other roles, redirect to the home page
        toast.success(
          'admin dashboard is not available for this user role with ' + tmp.role
        );
      }
    },
  });

  const { setUserData } = useContext(UserContext);

  const onFinish = async (values: any) => {
    await login({
      variables: { email: values.email, password: values.password },
    });
  };

  const [form] = Form.useForm(undefined);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className=" bg-white rounded-lg shadow-sm p-5! w-3/4 sm:w-96">
        <h2 className="text-black text-3xl font-semibold mb-6">Log In</h2>
        <Form
          name="login_form"
          onFinish={onFinish}
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input size="large" placeholder="john@example.com" />
          </Form.Item>
          <PasswordInput
            value={form.getFieldValue('password')}
            onChange={(value: any) => {
              form.setFieldValue('password', value);
            }}
          />
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full"
              loading={loading}
              type="primary"
              size="large"
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              className="w-full text-lg font-bold text-blue-500 hover:text-blue-700 items-right"
              onClick={() => navigate('/auth/forgot-password')}
              type="link"
              style={{ background: 'none', border: 'none' }}
            >
              Forgot Password?
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
