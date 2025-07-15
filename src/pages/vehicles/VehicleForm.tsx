import { Form, Input, Button, Row, Col, Select, Checkbox } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import toast from "react-hot-toast";

const VehicleForm = ({
  data,
  onComplete,
  form,
}: {
  data: any;
  onComplete: () => void;
  form: any;
}) => {
  const [mainForm] = useForm(form);
  const [isDriverOwner, setIsDriverOwner] = useState(true);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(data);
  }, [data]);

  const sizeOptions = [
    { text: "Small", value: "Small" },
    { text: "Medium", value: "Medium" },
    { text: "Large", value: "Large" },
  ];

  const colorOptions = [
    { text: "White", value: "White" },
    { text: "Black", value: "Black" },
    { text: "Silver", value: "Silver" },
    { text: "Gray", value: "Gray" },
    { text: "Blue", value: "Blue" },
    { text: "Red", value: "Red" },
    { text: "Green", value: "Green" },
    { text: "Yellow", value: "Yellow" },
    { text: "Orange", value: "Orange" },
    { text: "Other", value: "Other" },
  ];

  const handleFinish = async (values: any) => {
    try {
      if (data) {
      } else {
      }
      onComplete();
    } catch (error: any) {
      toast.error(ApolloErrorFormatter(error, true).toString());
    }
  };
  const { Option } = Select;

  return (
    <Form
      form={mainForm}
      layout='vertical'
      onFinish={handleFinish}
      requiredMark={false}
      initialValues={data}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name='vehicleType'
            label='Vehicle Type'
            rules={[{ required: true, message: "Vehicle type is required" }]}
          >
            <Input placeholder='e.g. Sedan, SUV' size='large' />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='plateNumber'
            label='Plate Number'
            rules={[{ required: true, message: "Plate number is required" }]}
          >
            <Input size='large' placeholder='e.g. AA-00000' />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='vehicleModel'
            label='Vehicle Model'
            rules={[{ required: true, message: "Vehicle model is required" }]}
          >
            <Input size='large' />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='size'
            label='Size'
            rules={[{ required: true, message: "Size is required" }]}
          >
            <Select
              placeholder='e.g. Small, Medium, Large'
              size='large'
              className='w-full'
            >
              {sizeOptions.map((item: { text: string; value: string }) => (
                <Option key={item?.value} value={item?.value}>
                  {item?.text}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='color'
            label='Color'
            rules={[{ required: true, message: "Color is required" }]}
          >
            <Select
              placeholder='e.g. Black, White, Blue'
              size='large'
              className='w-full'
            >
              {colorOptions.map((item: { text: string; value: string }) => (
                <Option key={item?.value} value={item?.value}>
                  {item?.text}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='vin'
            label='Vehicle Identification Number (VIN)'
            rules={[{ required: true, message: "VIN is required" }]}
          >
            <Input size='large' placeholder='Enter 17-character VIN' />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name={"driver"}
            label='Driver'
            rules={[{ required: true, message: "Driver is required" }]}
          >
            <Select placeholder='Select driver' size='large' className='w-full'>
              {sizeOptions.map((item: { text: string; value: string }) => (
                <Option key={item?.value} value={item?.value}>
                  {item?.text}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <h3 className='font-bold mb-4 mt-4'>Owner Information</h3>
        </Col>
        <Col span={24}>
          <Form.Item name='isDriverOwner' valuePropName='checked'>
            <Checkbox
              onChange={(e: any) => {
                setIsDriverOwner(e.target.checked);
              }}
            >
              Driver is the owner of this vehicle
            </Checkbox>
          </Form.Item>
        </Col>
        {!isDriverOwner && (
          <>
            <Col span={12}>
              <Form.Item
                name={["ownerInfo", "firstName"]}
                label='First Name'
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name={["ownerInfo", "lastName"]}
                label='Last Name'
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name={["ownerInfo", "phoneNumber"]}
                label='Phone Number'
                rules={[
                  { required: true, message: "Phone number is required" },
                ]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>
    </Form>
  );
};

export default VehicleForm;
