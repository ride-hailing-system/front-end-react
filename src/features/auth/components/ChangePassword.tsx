import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UPDATE_USER_PASSWORD } from "../../../graphql/mutations/user";
import { useEffect } from "react";
import { useGraphQL } from "../../../hooks/useGraphQL";

const ChangePasswordForm = ({
  form,
  onLoading,
}: {
  form: any;
  onLoading: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { mutation } = useGraphQL();

  const { runMutation: changePassword, loading } = mutation({
    mutationStr: UPDATE_USER_PASSWORD,
    onSuccess: () => {
      toast.success("Password updated successfully!");
      navigate("/auth/login");
    },
  });

  const onFinish = async (values: any) => {
    const { newPassword, confirmNewPassword } = values;

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    await changePassword({
      variables: { id: "", password: newPassword },
    });
  };

  useEffect(() => {
    onLoading(loading);
  }, [loading]);

  return (
    <div className='flex flex-col  bg-white'>
      <p className='text-gray-500 mb-4'>
        Kindly create a fresh password to enhance the security of your account.
      </p>
      <Form
        form={form}
        requiredMark={false}
        className=''
        onFinish={onFinish}
        layout='vertical'
      >
        <Form.Item
          label='Your current password'
          name='oldPassword'
          rules={[
            {
              required: true,
              message: "Please enter your current password!",
            },
            { len: 4, message: "The password must be 4 digits long!" },
          ]}
          className='mb-4'
        >
          <Input type='password' size='large' />
        </Form.Item>
        <Form.Item
          label='New password'
          name='newPassword'
          rules={[
            {
              required: true,
              message: "Please enter a new password!",
            },
            { len: 4, message: "The password must be 4 digits long!" },
          ]}
          className='mb-4'
        >
          <Input type='password' size='large' />
        </Form.Item>
        <Form.Item
          label='Confirm password'
          name='confirmNewPassword'
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
            { len: 4, message: "The password must be 4 digits long!" },
          ]}
          className='mb-7'
        >
          <Input type='password' size='large' />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
