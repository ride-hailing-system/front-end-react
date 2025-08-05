import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import { useLazyQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { LocalSearch } from "../../utils/localSearch";
import { Table } from "../../components/table";
import { Drawer } from "../../components/drawer";
import UserProfile from "../../components/userProfile";
import { GET_RIDES } from "../../graphql/queries/ride";
import RideStatus from "../../components/rideStatus";
import { useNavigate } from "react-router-dom";
import { ActionMenus } from "../users/actionMenus";
import { getActionMenus } from "./rideListDatas";
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from "../../context/confirmationModalContext";
import { DELETE_RIDE } from "../../graphql/mutations/ride";
import RideDetail from "./rideDetail";

export type RidesTableType = {
  showHeader?: boolean;
  limit?: number;
};

const Rides = ({ showHeader = true, limit = 10 }: RidesTableType) => {
  const navigate = useNavigate();
  const [rides, setRides] = useState<any[]>([]);
  const [ridesCopy, setRidesCopy] = useState<any[]>([]);
  const [selectedRides, setSelectedRides] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [rowLimits, setRowLimits] = useState<number>(limit);

  const [getRides, { loading }] = useLazyQuery(GET_RIDES, {
    fetchPolicy: "network-only",
    onCompleted: (value: any) => {
      setRides(value?.getAllRides || []);
      setRidesCopy(value?.getAllRides || []);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const [deleteRequest, { loading: deleting }] = useMutation(DELETE_RIDE, {
    onCompleted: () => {
      toast.success("request deleted successfully");
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  useEffect(() => {
    getRides({
      variables: {
        limit: rowLimits,
      },
    });
  }, []);

  useEffect(() => {
    if (ridesCopy.length > 0) {
      if (searchValue) {
        const result = LocalSearch({ searchValue }, rides, [
          "riderInfo.firstName",
          "riderInfo.lastName",
          "driverInfo.firstName",
          "driverInfo.lastName",
          "status",
          "requestNumber",
          "requestedAt",
        ]);

        setRides(result);
      } else {
        setRides(ridesCopy);
      }
    }
  }, [searchValue, ridesCopy]);

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteRequest({
        variables: {
          _id: id,
        },
      });
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while deleting the request"
      );
    }
  };

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
      title: "Driver",
      dataIndex: "driver",
      key: "driver",
      render: (_: string, record: any) => {
        if (!record?.driverInfo)
          return (
            <p className='flex items-center justify-center font-light border-solid border-gray-300 rounded-lg p-2'>
              <span className='text-red-500'>No driver assigned</span>
            </p>
          );
        return (
          <UserProfile
            firstName={record?.driverInfo?.firstName}
            lastName={record?.driverInfo?.lastName}
            photoUrl={record?.driverInfo?.photoUrl}
            link={`/admin/driver-detail/${record?.driverInfo?._id}`}
          />
        );
      },
    },
    {
      title: "Estimated Fare",
      dataIndex: "fare",
      key: "fare",
      render: (record: any) => {
        return <p className='font-bold'>{`${record} ETB`}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: string, record: any) => {
        return <RideStatus status={record?.status} />;
      },
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
      title: "More",
      key: "action",
      render: (record: any) => (
        <>
          <ActionMenus
            menuItems={getActionMenus({
              record,
              onEdit: (record: any) => {
                //  redirect to
                console.log(record);
              },
              onDelete: (record: any) => {
                setcmProps((prev: ConfirmationModalPropsType) => ({
                  ...prev,
                  content: "Are you sure want to delete this request ?",
                  okButtonText: "Yes, delete",
                  onOk: async () => {
                    handleDelete(record?._id);
                  },
                  show: true,
                }));
              },
              onViewDetail: (record: any) => {
                setSelectedRides(record);
                setOpenDrawer(true);
              },
            })}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        data={rides}
        columns={columns}
        rowKey='id'
        loading={loading || deleting}
        onSearchInputChange={(value: string) => {
          setSearchValue(value);
        }}
        placeholderText={
          "Search by name, status, request number or requested at."
        }
        showAddButton={true}
        addButtonTitle='Start new Ride'
        onAddButtonClicked={() => {
          navigate("/admin/rides/registration-form");
        }}
        showHeaderBar={showHeader}
      />

      {openDrawer && (
        <Drawer
          title={"View complete ride information"}
          open
          onClose={() => {
            setOpenDrawer(false);
          }}
          width={600}
          footer={<div />}
        >
          <RideDetail data={selectedRides} />
        </Drawer>
      )}
    </>
  );
};

export default Rides;
