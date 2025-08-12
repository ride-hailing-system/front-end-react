import { Form, Input, type FormInstance } from "antd";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { ApolloErrorFormatter } from "../graphql/apolloErrorFormatter";
import { useLazyQuery } from "@apollo/client";
import { CHECK_PASSWORD } from "../graphql/queries/auth";
import { UserContext } from "../store/context/userContext";

const PasswordInput = ({
  value,
  onChange,
  label = "Password",
}: {
  label?: string;
  value?: any;
  onChange: (value: any) => void;
}) => {
  return (
    <Form.Item
      label={label}
      name='password'
      rules={[
        {
          required: true,
          message: "Please enter your password",
        },
        {
          min: 8,
          message: "Password must be at least 8 characters long",
        },
        {
          pattern:
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()[\]{}])[A-Za-z\d@$!%*#?&^()[\]{}]+$/,
          message:
            "Password must include letters, numbers, and special characters",
        },
      ]}
      className='mb-4'
    >
      <Input.Password
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size='large'
      />
    </Form.Item>
  );
};

export const ConfirmationPassword = ({
  onChange,
  form,
  onSuccess,
  onLoading,
}: {
  onChange: (value: any) => void;
  form: FormInstance;
  onSuccess: (value: any) => void;
  onLoading: (value: boolean) => void;
}) => {
  const { userData } = useContext(UserContext);

  const [checkPassword, { loading }] = useLazyQuery(CHECK_PASSWORD, {
    onCompleted: (data) => {
      onSuccess(data.checkPassword);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const onFinish = async (values: any) => {
    await checkPassword({
      variables: { _id: userData._id, password: values.password },
    });
  };

  useEffect(() => {
    onLoading(loading);
  }, [loading, onLoading]);

  return (
    <Form
      form={form}
      layout='vertical'
      requiredMark={false}
      onFinish={onFinish}
    >
      <PasswordInput
        label='Please enter your password to make changes'
        onChange={onChange}
      />
    </Form>
  );
};

export default PasswordInput;
