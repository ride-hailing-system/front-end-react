import { useLazyQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import toast from "react-hot-toast";
import { Avatar, Button, Form, message, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Table } from "../../components/table";
import { Tabs } from "antd";
import UserProfile from "../../components/userProfile";
import RideStatus from "../../components/rideStatus";
import dayjs from "dayjs";
import { GET_DRIVER_DETAIL } from "../../graphql/queries/driver";
import { Drawer } from "../../components/drawer";
import VehicleForm from "../vehicles/VehicleForm";
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from "../../context/confirmationModalContext";

const DriverDetails = () => {
  const { userId } = useParams();

  const [userDetail, setUserDetail] = useState<any>(null);

  const [getUserDetail, { loading }] = useLazyQuery(GET_DRIVER_DETAIL, {
    fetchPolicy: "network-only",
    onCompleted: (value: any) => {
      setUserDetail(value?.getDriverDetail);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  useEffect(() => {
    if (userId) {
      getUserDetail({
        variables: {
          userId: userId,
        },
      });
    }
  }, [userId]);

  const items = [
    {
      key: "1",
      label: "Ride records",
      children: (
        <RidesRecords loading={loading} rideRecords={userDetail?.rides} />
      ),
    },
    {
      key: "2",
      label: "Vehicle Information",
      children: (
        <Vehicles
          vehicles={userDetail?.vehicleInfo}
          driverInfo={userDetail?.userInfo}
        />
      ),
    },
  ];

  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-between mb-4'>
      <div className='flex items-center justify-between bg-gray-50 p-4 rounded-lg w-full'>
        <div className='flex items-center gap-2'>
          {/* user profile */}
          <div>
            {!userDetail?.userInfo?.photoUrl ? (
              <Avatar
                src={userDetail?.userInfo?.photoUrl}
                size={80}
                style={{ marginRight: 8 }}
              />
            ) : (
              <Avatar
                icon={<UserOutlined />}
                size={80}
                style={{ marginRight: 8 }}
              />
            )}
          </div>
          {/* user info */}
          <div className='flex flex-col gap-1text-gray-600'>
            <div className='flex flex-col'>
              <span className='ml-3 font-bold text-2xl text-nowrap'>{`${userDetail?.userInfo?.firstName} ${userDetail?.userInfo?.lastName}`}</span>
            </div>
            <div className='ml-3 flex items-center gap-2'>
              <Icon
                icon='mdi:phone-outline'
                width={20}
                height={20}
                className='text-gray-700'
              />
              <span className='text-sm'>
                {userDetail?.userInfo?.phoneNumber}
              </span>
            </div>
            <div className='ml-3 flex items-center gap-2'>
              <Icon
                icon='mdi:email-outline'
                width={20}
                height={20}
                className='text-gray-700'
              />
              <span className='text-sm'>{userDetail?.userInfo?.email}</span>
            </div>
          </div>
        </div>
        <div>
          <Button
            type='primary'
            className=''
            onClick={() => {
              navigate("/admin/drivers?role=driver");
            }}
            icon={<Icon icon='mdi:arrow-left' />}
          >
            Return
          </Button>
        </div>
      </div>
      <div className='bg-gray-50 shadow-md rounded-lg mt-4 w-full p-4'>
        <Tabs
          defaultActiveKey='1'
          items={items}
          tabBarStyle={{
            marginBottom: 0,
            fontSize: "16px",
            fontWeight: "bold",
          }}
        />
      </div>
    </div>
  );
};

const RidesRecords = ({
  loading,
  rideRecords,
}: {
  loading: boolean;
  rideRecords: any[];
}) => {
  const columns: any[] = [
    {
      title: "Rider",
      dataIndex: "rider",
      key: "rider",
      render: (_: string, record: any) => (
        <UserProfile
          firstName={record?.riderInfo?.firstName}
          lastName={record?.riderInfo?.lastName}
          photoUrl={record?.riderInfo?.photoUrl}
        />
      ),
    },
    {
      title: "Requested At",
      dataIndex: "requestedAt",
      key: "requestedAt",
      render: (record: any) => (
        <p className=''>
          {dayjs(record?.requestedAt).format("YYYY/MM/DD HH:mm")}
        </p>
      ),
    },
    {
      title: "Completed At",
      dataIndex: "completedAt",
      key: "completedAt",
      render: (record: any) => (
        <p className=''>
          {dayjs(record?.completedAt).format("YYYY/MM/DD HH:mm")}
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: string, record: any) => {
        return <RideStatus status={record?.status} />;
      },
    },
  ];

  return (
    <Table
      data={rideRecords}
      columns={columns}
      rowKey='_id'
      loading={loading}
      showAddButton={false}
      showHeaderBar={false}
    />
  );
};

const Vehicles = ({
  vehicles,
  driverInfo,
}: {
  vehicles: any[];
  driverInfo: any;
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState<"form" | "detail" | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [mainForm] = Form.useForm();

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext
  );

  useEffect(() => {
    setcmProps((prev: ConfirmationModalPropsType) => ({
      ...prev,
      onOk: () => {
        console.log("Ok clicked");
      },
      onCancel: () => {
        console.log("Cancel clicked");
      },
    }));
  }, []);

  const columns: any[] = [
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (_: string, record: any) => {
        if (!record?.ownerInfo)
          return (
            <p className='flex items-center justify-center font-light border-solid border-gray-300 rounded-lg p-2'>
              <span className='text-red-500'>No owner assigned</span>
            </p>
          );
        return (
          <UserProfile
            firstName={record?.ownerInfo?.firstName}
            lastName={record?.ownerInfo?.lastName}
            photoUrl={record?.ownerInfo?.photoUrl}
          />
        );
      },
    },
    {
      title: "Plate #",
      dataIndex: "plateNumber",
      key: "plateNumber",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_: string, record: any) => (
        <div className='flex items-center'>
          <span className='ml-3 text-nowrap font-bold'>{`
          ${record?.vehicleType},${record?.size} - ${record?.vehicleModel} - ${record?.color}
          `}</span>
        </div>
      ),
    },
    {
      title: "More",
      key: "action",
      render: (record: any) => (
        <div className='flex items-center justify-between'>
          <Button
            className=''
            onClick={() => {
              setSelectedVehicle(record);
              setOpenDrawer(true);
            }}
            type='link'
          >
            Show details
          </Button>
          <Button
            className=''
            onClick={() => {
              setSelectedVehicle(record);
              setOpenDrawer(true);
              setDrawerContent("form");
            }}
            type='link'
          >
            Edit
          </Button>
          <Button
            className=''
            onClick={() => {
              setcmProps((prev: ConfirmationModalPropsType) => ({
                ...prev,
                show: true,
              }));
            }}
            type='link'
            danger
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const CustomEmptyComponent = () => (
    <div className='flex flex-col items-center justify-center gap-2'>
      <Icon icon='gg:add' width={40} height={40} className='text-gray-700' />
      <p className='text-gray-700 text-lg'>
        No vehicles found.{" "}
        <span
          onClick={() => {
            selectedVehicle(undefined);
            setDrawerContent("form");
            setOpenDrawer(true);
          }}
          className='hover:underline hover:cursor-pointer font-semibold'
        >
          Add a new one to get started.
        </span>
      </p>
    </div>
  );

  return (
    <>
      <Table
        data={vehicles}
        columns={columns}
        rowKey='_id'
        loading={loading}
        showAddButton={true}
        showHeaderBar={true}
        addButtonTitle='Add new Vehicle'
        emptyComponent={vehicles.length > 0 ? undefined : CustomEmptyComponent}
        showSearchInput={false}
        onAddButtonClicked={() => {
          setDrawerContent("form");
          setOpenDrawer(true);
        }}
      />

      {openDrawer && drawerContent === "detail" && (
        <Drawer
          title={"Vehicle detail view"}
          open
          onClose={() => {
            setOpenDrawer(false);
            setDrawerContent(null);
          }}
        >
          <p>Detail view</p>
        </Drawer>
      )}

      {openDrawer && drawerContent === "form" && (
        <Drawer
          title={
            selectedVehicle
              ? "Edit Vehicle Information"
              : "New Vehicle Registration"
          }
          open
          onClose={() => {
            setOpenDrawer(false);
            setDrawerContent(null);
            setSelectedVehicle(undefined);
          }}
          width={700}
          buttonTitle={selectedVehicle ? "Update" : "Create"}
          form={mainForm}
          loading={loading}
        >
          <VehicleForm
            data={selectedVehicle}
            form={mainForm}
            onComplete={() => {
              setOpenDrawer(false);
              setDrawerContent(null);
            }}
            driverInfo={driverInfo}
            onLoading={(value: boolean) => {
              setLoading(value);
            }}
          />
        </Drawer>
      )}
    </>
  );
};

export default DriverDetails;
