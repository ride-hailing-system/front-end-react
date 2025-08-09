import { Col, Form, InputNumber, Row, type FormInstance } from "antd";

const Location = ({ form }: { form: FormInstance }) => {
  return (
    <Row gutter={20}>
      <Col span='12'>
        <Form.Item
          name={["location", "pickupRadius"]}
          label={<strong>Pickup Radius (km)</strong>}
          tooltip='Default pickup search radius'
          rules={[{ required: true, message: "This field is required." }]}
        >
          {" "}
          <InputNumber
            min={0}
            size='large'
            style={{ width: "100%" }}
            onChange={(value: any) =>
              form.setFieldsValue({
                location: { pickupRadius: value },
              })
            }
          />{" "}
        </Form.Item>
      </Col>
      <Col span='12'>
        <Form.Item
          name={["location", "locationUpdateInterval"]}
          label={<strong>Location Update Frequency (s)</strong>}
          tooltip='Interval for location updates'
          rules={[{ required: true, message: "This field is required." }]}
        >
          {" "}
          <InputNumber
            min={1}
            size='large'
            style={{ width: "100%" }}
            onChange={(value: any) =>
              form.setFieldsValue({
                location: { locationUpdateInterval: value },
              })
            }
          />{" "}
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Location;
