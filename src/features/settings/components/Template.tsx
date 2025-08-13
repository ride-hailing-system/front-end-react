import { Col, Form, Input, Row, type FormInstance } from 'antd';

const Templates = ({ form }: { form: FormInstance }) => {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Form.Item
          name={['templates', 'driverAssigned']}
          label={<strong>Driver Assigned Template</strong>}
          tooltip="Message sent to rider when driver is assigned"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input.TextArea
            rows={3}
            size="large"
            onChange={(e) =>
              form.setFieldsValue({
                templates: { driverAssigned: e.target.value },
              })
            }
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name={['templates', 'rideCanceled']}
          label={<strong>Ride Canceled Template</strong>}
          tooltip="Message sent to driver when ride is canceled"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input.TextArea
            rows={3}
            size="large"
            onChange={(e) =>
              form.setFieldsValue({
                templates: { rideCanceled: e.target.value },
              })
            }
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
export default Templates;
