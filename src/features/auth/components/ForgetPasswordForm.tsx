import { Form, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { FORGET_PASSWORD } from "../../../graphql/queries/auth";
import toast from "react-hot-toast";
import { useGraphQL } from "../../../hooks/useGraphQL";

const ForgetPasswordForm = () => {
  const navigate = useNavigate();

  const { query } = useGraphQL();

  const { runQuery: forget, loading } = query({
    queryStr: FORGET_PASSWORD,
    onSuccess: (data) => {
      toast.success(data.forgetPassword.message);
      form.resetFields();
    },
  });

  const onFinish = async (values: any) => {
    await forget({
      variables: { email: values.email },
    });
  };

  const [form] = Form.useForm();

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white rounded-lg shadow-sm p-5! w-3/4 sm:w-96'>
        <h2 className='text-black text-lg font-semibold mb-2'>
          Forgot Password
        </h2>
        <h3 className='text-gray-700 font-light mb-4'>
          Enter your email to reset your password
        </h3>
        <Form
          name='forgot_password_form'
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
          <Form.Item>
            <Button
              htmlType='submit'
              className='w-full'
              loading={loading}
              type='primary'
              size='large'
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type='link'
              onClick={() => navigate("/auth/login")}
              className='w-full text-blue-500 hover:text-blue-700'
            >
              Back to Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
