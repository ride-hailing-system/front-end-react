import { Form, Input } from "antd";

const PasswordInput = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (value: any) => void;
}) => {
  return (
    <Form.Item
      label='Password'
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
      className="mb-4"
    >
      <Input.Password
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size='large'
      />
    </Form.Item>
  );
};

export default PasswordInput;
