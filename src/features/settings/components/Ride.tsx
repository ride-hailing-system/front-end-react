import { Col, Form, InputNumber, Row, type FormInstance } from 'antd';

const Ride = ({ form }: { form: FormInstance }) => {
  return (
    <Row gutter={20}>
      <Col span="12">
        <Form.Item
          name={['ride', 'baseFare']}
          label={<strong>Base Fare</strong>}
          tooltip="Initial minimum price for the ride"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          {' '}
          <InputNumber
            min={0}
            size="large"
            style={{ width: '100%' }}
            onChange={(value: any) =>
              form.setFieldsValue({
                ride: { baseFare: value },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name={['ride', 'ratePerKm']}
          label={<strong>Price per KM</strong>}
          tooltip="added Price per kilometer"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          {' '}
          <InputNumber
            min={0}
            size="large"
            style={{ width: '100%' }}
            onChange={(value: any) =>
              form.setFieldsValue({
                ride: { ratePerKm: value },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name={['ride', 'ratePerKmAfterNight']}
          label={<strong>Rate per KM (after night)</strong>}
          tooltip="Price per kilometer (after night)"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          {' '}
          <InputNumber
            min={0}
            size="large"
            style={{ width: '100%' }}
            onChange={(value: any) =>
              form.setFieldsValue({
                ride: { ratePerKmAfterNight: value },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name={['ride', 'cancelationTimeLimit']}
          label={<strong>Request Cancelation Time (max)</strong>}
          tooltip="Time limit for ride request cancelation"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          {' '}
          <InputNumber
            min={0}
            max={60}
            size="large"
            style={{ width: '100%' }}
            onChange={(value: any) =>
              form.setFieldsValue({
                ride: { cancelationTimeLimit: value },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name={['ride', 'maxRideDistance']}
          label={<strong>Max Ride Distance (km)</strong>}
          tooltip="recommended max ride distance"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          {' '}
          <InputNumber
            min={0}
            size="large"
            style={{ width: '100%' }}
            onChange={(value: any) =>
              form.setFieldsValue({
                ride: { maxRideDistance: value },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name={['ride', 'rideRequestTimeout']}
          label={<strong>Ride Request Timeout (s)</strong>}
          tooltip="Timeout for accepting ride request for drivers"
          rules={[{ required: true, message: 'This field is required.' }]}
        >
          {' '}
          <InputNumber
            min={0}
            size="large"
            style={{ width: '100%' }}
            onChange={(value: any) =>
              form.setFieldsValue({
                ride: { rideRequestTimeout: value },
              })
            }
          />{' '}
        </Form.Item>
      </Col>
    </Row>
  );
};
export default Ride;
