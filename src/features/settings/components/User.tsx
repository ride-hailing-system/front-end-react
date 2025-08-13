import { Col, Form, Row, Switch, type FormInstance } from 'antd';

const User = ({ form }: { form: FormInstance }) => {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Form.Item
          name={['user', 'requireKyc']}
          label={<strong>Require Know your customer</strong>}
          tooltip="Enable identity verification by sending SMS"
          valuePropName="checked"
        >
          {' '}
          <Switch
            size="default"
            onChange={(checked: boolean) =>
              form.setFieldsValue({
                user: { requireKyc: checked },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name={['user', 'requireDriverApproval']}
          label={<strong>Driver Approval Required</strong>}
          tooltip="Admin must approve drivers"
          valuePropName="checked"
        >
          {' '}
          <Switch
            size="default"
            onChange={(checked: boolean) =>
              form.setFieldsValue({
                user: { requireDriverApproval: checked },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
    </Row>
  );
};
export default User;
