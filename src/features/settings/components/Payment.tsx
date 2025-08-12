import { Col, Form, InputNumber, Row, Select, type FormInstance } from "antd";

const Payment = ({ form }: { form: FormInstance }) => {
  const { Option } = Select;

  return (
    <Row gutter={20}>
      <Col span={12}>
        <Form.Item
          name={["payment", "paymentMethods"]}
          label={<strong>Supported Payment Methods</strong>}
          tooltip='Select all allowed payment types'
          rules={[{ required: true, message: "This field is required." }]}
        >
          {" "}
          <Select
            mode='multiple'
            allowClear
            size='large'
            onChange={(value: any) =>
              form.setFieldsValue({
                payment: { paymentMethods: value },
              })
            }
          >
            {" "}
            <Option value='cash'>Cash</Option>{" "}
            <Option value='transfer'>Transfer</Option>{" "}
          </Select>{" "}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name={["payment", "taxRate"]}
          label={<strong>Tax/VAT (%)</strong>}
          tooltip='Applicable tax rate'
          rules={[{ required: true, message: "This field is required." }]}
        >
          {" "}
          <InputNumber
            min={0}
            max={100}
            size='large'
            style={{ width: "100%" }}
            onChange={(value: any) =>
              form.setFieldsValue({
                payment: { taxRate: value },
              })
            }
          />{" "}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name={["payment", "driverCommission"]}
          label={<strong>Driver Commission (%)</strong>}
          tooltip='Platform share from fare'
          rules={[{ required: true, message: "This field is required." }]}
        >
          {" "}
          <InputNumber
            min={0}
            max={100}
            size='large'
            style={{ width: "100%" }}
            onChange={(value: any) =>
              form.setFieldsValue({
                payment: { driverCommission: value },
              })
            }
          />{" "}
        </Form.Item>
      </Col>
    </Row>
  );
};
export default Payment;
