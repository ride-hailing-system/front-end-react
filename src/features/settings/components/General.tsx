import { Icon } from '@iconify/react/dist/iconify.js';
import { Col, Form, Input, Row, TimePicker, type FormInstance } from 'antd';

const General = ({ form }: { form: FormInstance }) => {
  return (
    <Row gutter={20}>
      <Col span="12">
        <Form.Item
          name={['general', 'appName']}
          label={<strong>App Name</strong>}
          tooltip="Name of the app"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          {' '}
          <Input
            size="large"
            onChange={(e: any) =>
              form.setFieldsValue({
                general: { appName: e.target.value },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name={['general', 'supportEmail']}
          label={<strong>Support Email</strong>}
          tooltip="Support contact email"
          rules={[
            { required: true, message: 'This field is required.' },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          {' '}
          <Input
            type="email"
            size="large"
            prefix={
              <Icon
                icon="ic:outline-email"
                className="text-gray-400"
                width={20}
                height={20}
              />
            }
            onChange={(e: any) =>
              form.setFieldsValue({
                general: { supportEmail: e.target.value },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name={['general', 'supportPhone']}
          label={<strong>Support Phone</strong>}
          tooltip="Support contact phone number"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          {' '}
          <Input
            size="large"
            prefix={
              <Icon
                icon="ic:outline-phone"
                className="text-gray-400"
                width={20}
                height={20}
              />
            }
            onChange={(e: any) =>
              form.setFieldsValue({
                general: { supportPhone: e.target.value },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name={['general', 'currency']}
          label={<strong>Default Currency</strong>}
          tooltip="System-wide currency"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          {' '}
          <Input
            size="large"
            prefix={
              <Icon
                icon="tabler:currency"
                className="text-gray-400"
                width={20}
                height={20}
              />
            }
            onChange={(e: any) =>
              form.setFieldsValue({
                general: { currency: e.target.value },
              })
            }
          />{' '}
        </Form.Item>
      </Col>

      <Col span="12">
        <Form.Item
          name={['general', 'afterNightHours', 'start']}
          label={<strong>After night hours start</strong>}
          tooltip="Default after night hours start"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          <TimePicker
            placeholder=""
            size="large"
            className="w-full"
            onChange={(time: any) =>
              form.setFieldsValue({
                general: { afterNightHours: { start: time } },
              })
            }
          />
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name={['general', 'afterNightHours', 'end']}
          label={<strong>After night hours end</strong>}
          tooltip="Default after night hours end"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          <TimePicker
            placeholder=""
            size="large"
            className="w-full"
            onChange={(time: any) =>
              form.setFieldsValue({
                general: { afterNightHours: { end: time } },
              })
            }
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default General;
