import { Form, Input, Button, Spin } from "antd";
import PlacesAutocomplete, {
  type LocationType,
} from "../../components/placesAutoComplete";
import { useContext, useEffect, useState } from "react";
import type { MapTypes, OnCalculateType } from "../../components/map";
import Map from "../../components/map";
import { Icon } from "@iconify/react/dist/iconify.js";
import PhoneNumberInput, {
  type onPhoneNumberInputChangeProps,
} from "../../components/phoneNumberInput";
import { useForm } from "antd/es/form/Form";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import { CREATE_RIDE, UPDATE_RIDE } from "../../graphql/mutations/ride";
import ShortUniqueId from "short-unique-id";
import { useNavigate } from "react-router-dom";
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from "../../context/confirmationModalContext";

type StartRideFormValues = {
  _id?: string;
  rider?: string;
  phoneNumber?: string;
  fullName?: string;
  pickupLocation: {
    latitude: number;
    longitude: number;
    description: string;
  };
  dropOffLocation: {
    latitude: number;
    longitude: number;
    description: string;
  };
  createdByAdmin: boolean;
  fare: number;
};

const RideRegistrationForm = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState<MapTypes>();
  const [calculatedValues, setCalculatedValues] = useState<OnCalculateType>();

  return (
    <>
      <div className='flex gap-4 mb-4'>
        <div className='flex justify-center items-center cursor-pointer'>
          <Icon
            icon='ion:arrow-back-outline'
            className='text-gray-900 self-center'
            width={30}
            height={30}
            onClick={() => {
              navigate("/admin/rides");
            }}
          />
        </div>

        <div>
          <h1 className='text-2xl font-bold'>Ride Registration</h1>
          <p className='text-gray-600'>
            Please fill out the form to register your ride.
          </p>
        </div>
      </div>
      <div className='relative w-full h-screen'>
        {/* Google Map container */}
        <div className='w-full h-screen' id='map'>
          <Map
            from={location?.from}
            to={location?.to}
            onCalculate={(value: OnCalculateType | undefined) => {
              setCalculatedValues(value);
            }}
          />
        </div>

        {/* Left Aside Overlay */}
        <aside className='absolute top-4 left-4 w-80 bg-white shadow-md rounded-lg z-10 p-4 overflow-y-auto'>
          <h2 className='text-lg font-bold mb-2'>Ride Information</h2>
          <RegistrationForm
            onLocationChange={(value: MapTypes) => {
              setLocation((prev: MapTypes | undefined) => ({
                ...prev,
                ...value,
              }));
            }}
            cvs={calculatedValues}
            data={undefined}
            onComplete={() => {
              setLocation(undefined);
              setCalculatedValues(undefined);
              navigate("/admin/rides");
            }}
          />
        </aside>
      </div>
    </>
  );
};

const RegistrationForm = ({
  onLocationChange,
  cvs,
  data,
  onComplete = () => {},
}: {
  onLocationChange: (value: MapTypes) => void;
  cvs: OnCalculateType | undefined;
  data: StartRideFormValues | undefined;
  onComplete?: () => void;
}) => {
  const [val, setVal] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [userChecked, setUserChecked] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [calculatedValues, setCalculatedValues] = useState<
    OnCalculateType | undefined
  >();
  const { randomUUID } = new ShortUniqueId({
    length: 8,
    dictionary: "number",
  });

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext
  );

  useEffect(() => {
    setcmProps((prev: ConfirmationModalPropsType) => ({
      ...prev,
      onCancel: () => {},
    }));
  }, []);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(data);
  }, [data]);

  const [createRide] = useMutation(CREATE_RIDE, {
    onCompleted: () => {
      toast.success("Ride request created successfully");
      setTimeout(() => {
        onComplete();
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });
  const [updateRide] = useMutation(UPDATE_RIDE, {
    onCompleted: () => {
      toast.success("Ride request updated successfully");
      setTimeout(() => {
        onComplete();
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const handleConfirmation = (values: StartRideFormValues) => {
    setcmProps((prev: ConfirmationModalPropsType) => ({
      ...prev,
      show: true,
      content: "Are you sure you want to start this ride?",
      cancelButtonText: "Cancel",
      okButtonText: "Yes, Start Ride",
      onOk: () => {
        submitForm(values);
      },
    }));
  };

  const submitForm = async (values: StartRideFormValues) => {
    const payload: StartRideFormValues = { ...values };

    if (userData) {
      delete payload.phoneNumber;
      delete payload.fullName;
    }

    try {
      if (data) {
        await updateRide({
          variables: payload,
        });
      } else {
        const requestNumber: any = await randomUUID().toString();

        await createRide({
          variables: { ...payload, requestNumber: requestNumber },
        });
      }
    } catch (error: any) {
      toast.error(ApolloErrorFormatter(error, true).toString());
    }
  };

  const [form] = useForm();

  useEffect(() => {
    setCalculatedValues(cvs);
    if (cvs && typeof cvs.distanceInKm === "number") {
      form.setFieldValue("fare", cvs.distanceInKm * 50);
    } else {
      form.setFieldValue("fare", undefined);
    }
  }, [cvs]);

  return (
    <Spin
      spinning={loading}
      size='default'
      tip={"Checking phone number existence ..."}
    >
      <Form
        layout='vertical'
        onFinish={handleConfirmation}
        requiredMark={false}
        form={form}
        initialValues={{
          createdByAdmin: true,
          rider: undefined,
        }}
      >
        <Form.Item name='rider' hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item name='createdByAdmin' hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item name='fare' hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item
          label='From where ?'
          name='pickupLocation'
          rules={[{ required: true, message: "" }]}
        >
          <PlacesAutocomplete
            placeHolderText='Where did you start your ride?'
            onSelect={(value: LocationType | undefined) => {
              if (
                value &&
                typeof value.latitude === "number" &&
                typeof value.longitude === "number" &&
                typeof value.description === "string"
              ) {
                onLocationChange({
                  from: {
                    latitude: value.latitude,
                    longitude: value.longitude,
                    description: value.description,
                  },
                });
                form.setFieldValue("pickupLocation", {
                  latitude: value.latitude,
                  longitude: value.longitude,
                  description: value.description,
                });
              } else {
                setCalculatedValues(undefined);
                form.setFieldValue("pickupLocation", undefined);
                form.setFieldValue("fare", undefined);
              }
            }}
            prefix={
              <Icon
                icon='material-symbols:start'
                className='text-gray-400'
                width={20}
                height={20}
              />
            }
          />
        </Form.Item>
        <Form.Item
          label='To where ?'
          name='dropoffLocation'
          rules={[{ required: true, message: "" }]}
        >
          <PlacesAutocomplete
            placeHolderText='Where are you going?'
            onSelect={(value: LocationType | undefined) => {
              if (
                value &&
                typeof value.latitude === "number" &&
                typeof value.longitude === "number" &&
                typeof value.description === "string"
              ) {
                onLocationChange({
                  to: {
                    latitude: value.latitude,
                    longitude: value.longitude,
                    description: value.description,
                  },
                });
                form.setFieldValue("dropoffLocation", {
                  latitude: value.latitude,
                  longitude: value.longitude,
                  description: value.description,
                });
              } else {
                setCalculatedValues(undefined);
                form.setFieldValue("dropoffLocation", undefined);
                form.setFieldValue("fare", undefined);
              }
            }}
            prefix={
              <Icon
                icon='mdi:location'
                className='text-gray-400'
                width={20}
                height={20}
              />
            }
          />
        </Form.Item>
        <Form.Item
          label='Phone number'
          // name='phoneNumber'
          rules={[{ required: true, message: "" }]}
        >
          <PhoneNumberInput
            onChange={(value: onPhoneNumberInputChangeProps) => {
              form.setFieldValue("phoneNumber", value.formatted);
              setVal(value?.raw);
            }}
            onPressEnter={(value: any) => {
              setUserData(value);
              setUserChecked(true);
              if (value) {
                form.setFieldValue(
                  "fullName",
                  `${value?.firstName} ${value?.lastName}`
                );
                form.setFieldValue("rider", value?._id);
              } else {
                form.resetFields(["fullName", "rider"]);
              }
            }}
            onChecking={(v: boolean) => {
              setLoading(v);
            }}
            disabled={userData}
            value={val}
          />
          {userData && (
            <Button
              type='link'
              className=''
              onClick={() => {
                setUserData(undefined);
                setUserChecked(false);
                form.resetFields(["phoneNumber", "fullName", "rider"]);
                setVal(undefined);
              }}
            >
              Change
            </Button>
          )}
        </Form.Item>
        {userChecked && (
          <Form.Item
            label='Rider name'
            name='fullName'
            rules={[
              { required: true, message: "Please enter rider's full name" },
            ]}
          >
            <Input
              size='large'
              placeholder='e.g., John Doe'
              disabled={userData}
            />
          </Form.Item>
        )}
        {calculatedValues && (
          <div className='border rounded-md border-green-200 bg-green-100 p-2 mb-4 transition-all duration-300 ease-in-out'>
            <span>{`Estimated Distance (KM) : ${calculatedValues?.distanceInKm}`}</span>
          </div>
        )}
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className='w-full'
            disabled={!userChecked}
          >
            Start Ride
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default RideRegistrationForm;
