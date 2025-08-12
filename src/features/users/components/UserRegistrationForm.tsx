import { Form, Input } from "antd";
import ShortUniqueId from "short-unique-id";
import { ApolloErrorFormatter } from "../../../graphql/apolloErrorFormatter";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { GET_USERS } from "../../../graphql/queries/user";
import { CREATE_USER, UPDATE_USER } from "../../../graphql/mutations/user";
import { Drawer } from "../../../components/Drawer";
import { useGraphQL } from "../../../hooks/useGraphQL";

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
  const [loading, setLoading] = useState(false);

  const { randomUUID } = new ShortUniqueId({
    length: 4,
    dictionary: "number",
  });
  const { mutation } = useGraphQL();

  const { runMutation: createUser, loading: creating } = mutation({
    mutationStr: CREATE_USER,
    onSuccess: () => {
      toast.success("User created successfully");
      onComplete();
    },
    refetchStr: [GET_USERS],
  });

  const { runMutation: updateUser, loading: updating } = mutation({
    mutationStr: UPDATE_USER,
    onSuccess: () => {
      toast.success("User updated successfully");
      onComplete();
    },
    refetchStr: [GET_USERS],
  });

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(data);
  }, [data]);

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

  useEffect(() => {
    setLoading(creating || updating);
  }, [creating, updating]);

  return (
    <Drawer
      title={data ? `Edit ${role}` : `New ${role} Registration`}
      open
      onClose={() => {
        onClose();
      }}
      isEdit={data ? true : false}
      form={mainForm}
      loading={loading}
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
