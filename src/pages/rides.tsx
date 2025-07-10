import { Button } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ApolloErrorFormatter } from "../graphql/apolloErrorFormatter";
import { useLazyQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { LocalSearch } from "../utils/localSearch";
import { Table } from "../components/table";
import { Drawer } from "../components/drawer";
import UserProfile from "../components/userProfile";
import { GET_RIDES } from "../graphql/queries/ride";
import RideStatus from "../components/rideStatus";

const Rides = () => {
  const [rides, setRides] = useState<any[]>([]);
  const [selectedRides, setSelectedRides] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const [getRides, { loading }] = useLazyQuery(GET_RIDES, {
    fetchPolicy: "network-only",
    onCompleted: (value: any) => {
      setRides(value?.getAllRides || []);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  useEffect(() => {
    getRides();
  }, []);

  useEffect(() => {
    if (rides) {
      if (searchValue) {
        const result = LocalSearch({ searchValue }, rides, [
          "riderInfo.firstName",
          "riderInfo.lastName",
          "driverInfo.firstName",
          "driverInfo.lastName",
          "status",
          "requestedAt",
        ]);
        setRides(result);
      } else {
        setRides(rides);
      }
    }
  }, [searchValue, rides]);

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
          <Button
            className='mr-3'
            onClick={() => {
              setSelectedRides(record);
              setOpenDrawer(true);
            }}
            type='link'
          >
            Show details
          </Button>
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
        loading={loading}
        onSearchInputChange={(value: string) => {
          setSearchValue(value);
        }}
        placeholderText={
          "Search by ride information such as rider, driver,  status, and requested at."
        }
        showAddButton={true}
        addButtonTitle='Start new Ride'
        onAddButtonClicked={() => {
          toast.error("This feature is not implemented yet.");
        }}
      />

      {openDrawer && (
        <Drawer
          title={"Ride detail view"}
          open
          onClose={() => {
            setOpenDrawer(false);
          }}
        >
          <p>Detail view</p>
          <p>Selected Ride: {JSON.stringify(selectedRides)}</p>
        </Drawer>
      )}
    </>
  );
};

export default Rides;
