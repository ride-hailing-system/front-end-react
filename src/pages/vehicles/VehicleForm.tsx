import { Form, Input, Button, Row, Col, Select, Checkbox } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import {
  CREATE_VEHICLE,
  UPDATE_VEHICLE,
} from "../../graphql/mutations/vehicle";

const VehicleForm = ({
  data,
  onComplete,
  form,
  driverInfo,
  onLoading,
}: {
  data: any;
  onComplete: () => void;
  form: any;
  driverInfo: any;
  onLoading: (value: boolean) => void;
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
    { text: "White", value: "White", hex: "#FFFFFF" },
    { text: "Black", value: "Black", hex: "#000000" },
    { text: "Silver", value: "Silver", hex: "#C0C0C0" },
    { text: "Gray", value: "Gray", hex: "#808080" },
    { text: "Blue", value: "Blue", hex: "#0000FF" },
    { text: "Red", value: "Red", hex: "#FF0000" },
    { text: "Green", value: "Green", hex: "#008000" },
    { text: "Yellow", value: "Yellow", hex: "#FFFF00" },
    { text: "Orange", value: "Orange", hex: "#FFA500" },
    { text: "Other", value: "Other", hex: "" },
  ];

  const [createVehicle, { loading: creating }] = useMutation(CREATE_VEHICLE, {
    onCompleted: () => {
      toast.success("Vehicle created successfully");
      onComplete();
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const [updateVehicle, { loading: updating }] = useMutation(UPDATE_VEHICLE, {
    onCompleted: () => {
      toast.success("Vehicle updated successfully");
      onComplete();
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const handleFinish = async (values: any) => {
    try {
      const payload = { ...values };
      payload.isDriverOwner = isDriverOwner;
      payload.driver = driverInfo?._id;

      if (data) {
        payload._id = data?._id;

        await updateVehicle({
          variables: payload,
        });
      } else {
        await createVehicle({
          variables: payload,
        });
      }
    } catch (error: any) {
      toast.error(ApolloErrorFormatter(error, true).toString());
    }
  };

  useEffect(() => {
    onLoading(creating || updating);
  }, [creating, updating]);

  const { Option } = Select;

  return (
    <Form
      form={mainForm}
      layout='vertical'
      onFinish={handleFinish}
      initialValues={data}
      disabled={creating || updating}
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
            <Input size='large' placeholder="Type your car's model name" />
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
              {colorOptions.map(
                (item: { text: string; value: string; hex: string }) => (
                  <Option key={item?.value} value={item?.value}>
                    <p className='flex items-center justify-between'>
                      <span>{item?.text}</span>
                      <span
                        className={`rounded-full w-5 h-5 ml-2`}
                        style={{
                          backgroundColor: item.hex,
                          borderWidth: item?.value === "White" ? 1 : 0,
                        }}
                      />
                    </p>
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='vin'
            label='Vehicle Identification Number (VIN)'
            rules={[
              { required: true, message: "VIN is required" },
              {
                pattern: /^[A-HJ-NPR-Z0-9]{17}$/,
                message: "VIN must be 17 characters (no I, O, Q)",
              },
            ]}
          >
            <Input
              size='large'
              placeholder='e.g. 1HGCM82633A004352'
              maxLength={17}
              style={{ textTransform: "uppercase" }}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <h3 className='font-bold mb-4 mt-4'>Owner Information</h3>
        </Col>
        <Col span={24}>
          <Form.Item name='isDriverOwner'>
            <Checkbox
              onChange={(e: any) => {
                setIsDriverOwner(e.target.checked);
                if (e.target.checked) {
                  mainForm.resetFields(["ownerInfo"]);
                }
              }}
              value={isDriverOwner}
              checked={isDriverOwner}
            >
              <span>
                Is{" "}
                <span className='font-semibold'>
                  {driverInfo?.firstName} {driverInfo?.lastName}
                </span>{" "}
                the owner of this vehicle ?
              </span>
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
