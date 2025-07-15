import { Form, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/queries/auth";
import toast from "react-hot-toast";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";

const Login = () => {
  const navigate = useNavigate();

  const [login, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      const tmp = data.login;
      localStorage.setItem("user", JSON.stringify(tmp));
      toast.success("Login successful! Redirecting...");
      console.log(tmp);

      if (tmp.role === "admin") {
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        // For other roles, redirect to the home page
        toast.success(
          "admin dashboard is not available for this user role with " + tmp.role
        );
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      }
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const onFinish = async (values: any) => {
    await login({
      variables: { phoneNumber: values.phone, password: values.password },
    });
  };

  const [form] = Form.useForm();

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className=' bg-white rounded-lg shadow-sm p-5! w-3/4 sm:w-96'>
        <h2 className='text-black text-3xl font-semibold mb-6'>Log In</h2>
        <Form
          name='login_form'
          onFinish={onFinish}
          form={form}
          layout='vertical'
          requiredMark={false}
        >
          <Form.Item
            label='Email address'
            name='email'
            rules={[
              { required: true, message: "Please enter your email" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              value={form.getFieldValue("email")}
              onChange={(e) => {
                form.setFieldValue("email", e.target.value);
              }}
              size='large'
              placeholder='john@example.com'
            />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: "Please enter your password",
                len: 4,
              },
            ]}
          >
            <Input.Password
              value={form.getFieldValue("password")}
              onChange={(e) => {
                form.setFieldValue("password", e.target.value);
              }}
              size='large'
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              className='w-full'
              loading={loading}
              type='primary'
              size='large'
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='button'
              className='w-full text-lg font-bold text-blue-500 hover:text-blue-700 items-right'
              onClick={() => navigate("/auth/forgot-password")}
              type='link'
              style={{ background: "none", border: "none" }}
            >
              Forgot Password?
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
