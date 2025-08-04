import { Form, Input } from "antd";
import ShortUniqueId from "short-unique-id";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/user";
import { CREATE_USER, UPDATE_USER } from "../../graphql/mutations/user";
import { Drawer } from "../../components/drawer";

const UserRegistrationForm = ({
  data,
  onClose,
  onComplete,
  form,
  role,
}: {
  data: any;
  onClose: () => void;
  onComplete: () => void;
  form: any;
  role: "user" | "driver" | "rider" | null;
}) => {
  const { randomUUID } = new ShortUniqueId({
    length: 4,
    dictionary: "number",
  });

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(data);
  }, [data]);

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [GET_USERS],
    onCompleted: () => {
      toast.success("User created successfully");
      onComplete();
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USERS],
    onCompleted: () => {
      toast.success("User updated successfully");
      onComplete();
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const handleFinish = async (values: any) => {
    try {
      if (data) {
        await updateUser({
          variables: values,
        });
      } else {
        const password: any = await randomUUID().toString();

        await createUser({
          variables: { ...values, password: password },
        });
      }
    } catch (error: any) {
      toast.error(ApolloErrorFormatter(error, true).toString());
    }
  };

  const [mainForm] = Form.useForm(form);

  return (
    <Drawer
      title={data ? `Edit ${role}` : `New ${role} Registration`}
      open
      onClose={() => {
        onClose();
      }}
      isEdit={data ? true : false}
      form={mainForm}
    >
      <Form
        layout='vertical'
        onFinish={handleFinish}
        form={mainForm}
        requiredMark={false}
        disabled={role === "user" ? false : true}
      >
        <Form.Item name='_id' hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item name='role' hidden>
          <Input hidden value={role || undefined} />
        </Form.Item>
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[
            {
              required: true,
              message: "Please enter the user's first name",
            },
          ]}
        >
          <Input size='large' />
        </Form.Item>
        <Form.Item
          label='Last Name'
          name='lastName'
          rules={[
            {
              required: true,
              message: "Please enter the user's last name",
            },
          ]}
        >
          <Input size='large' />
        </Form.Item>

        <Form.Item
          label='Phone Number'
          name='phoneNumber'
          rules={[
            {
              required: true,
              message: "Please enter the user's phone number",
            },
            {
              min: 8,
              message: "The phone number must contain at least 8 digits",
            },
          ]}
        >
          <Input size='large' />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: "Please enter the user's email",
            },
          ]}
        >
          <Input size='large' type='email' />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserRegistrationForm;
