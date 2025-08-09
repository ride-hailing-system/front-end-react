import { Col, Form, Row, Switch, type FormInstance } from "antd";

const Notification = ({ form }: { form: FormInstance }) => {
  return (
    <Row gutter={20}>
      <Col span={6}>
        <Form.Item
          name={["notification", "enableSms"]}
          label={<strong>Enable SMS</strong>}
          tooltip='Send SMS notifications'
          valuePropName='checked'
        >
          {" "}
          <Switch
            size='default'
            onChange={(checked: boolean) =>
              form.setFieldsValue({
                notification: { enableSms: checked },
              })
            }
          />{" "}
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          name={["notification", "enablePush"]}
          label={<strong>Enable Push</strong>}
          tooltip='Send push notifications'
          valuePropName='checked'
        >
          {" "}
          <Switch
            size='default'
            onChange={(checked: boolean) =>
              form.setFieldsValue({
                notification: { enablePush: checked },
              })
            }
          />{" "}
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          name={["notification", "enableEmail"]}
          label={<strong>Enable Email</strong>}
          tooltip='Send email notifications'
          valuePropName='checked'
        >
          {" "}
          <Switch
            size='default'
            onChange={(checked: boolean) =>
              form.setFieldsValue({
                notification: { enableEmail: checked },
              })
            }
          />{" "}
        </Form.Item>
      </Col>
    </Row>
  );
};
export default Notification;
