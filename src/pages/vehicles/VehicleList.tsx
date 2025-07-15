import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import { useLazyQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { LocalSearch } from "../../utils/localSearch";
import { Table } from "../../components/table";
import { GET_VEHICLES } from "../../graphql/queries/vehicle";
import { Drawer } from "../../components/drawer";
import UserProfile from "../../components/userProfile";
import VehicleForm from "./VehicleForm";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [vehiclesCopy, setVehiclesCopy] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState<"form" | "detail" | null>(
    null
  );

  const [getVehicles, { loading }] = useLazyQuery(GET_VEHICLES, {
    fetchPolicy: "network-only",
    onCompleted: (value: any) => {
      setVehicles(value?.getAllVehicles || []);
      setVehiclesCopy(value?.getAllVehicles || []);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  useEffect(() => {
    getVehicles();
  }, []);

  useEffect(() => {
    if (vehiclesCopy.length > 0) {
      if (searchValue) {
        const result = LocalSearch({ searchValue }, vehicles, [
          "vehicleType",
          "plateNumber",
          "vehicleModel",
          "size",
          "color",
        ]);
        setVehicles(result);
      } else {
        setVehicles(vehiclesCopy);
      }
    }
  }, [searchValue, vehiclesCopy]);

  const columns: any[] = [
    {
      title: "Driver",
      dataIndex: "driver",
      key: "driver",
      render: (_: string, record: any) => (
        <UserProfile
          firstName={record?.driverInfo?.firstName}
          lastName={record?.driverInfo?.lastName}
          photoUrl={record?.driverInfo?.photoUrl}
        />
      ),
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
        <>
          <Button
            className='mr-3'
            onClick={() => {
              setSelectedVehicle(record);
              setOpenDrawer(true);
              setDrawerContent("form");
            }}
            type='link'
          >
            Show details
          </Button>
        </>
      ),
    },
  ];

  const [mainForm] = Form.useForm();

  return (
    <>
      <Table
        data={vehicles}
        columns={columns}
        rowKey='id'
        loading={loading}
        onSearchInputChange={(value: string) => {
          setSearchValue(value);
        }}
        placeholderText={
          "Search by vehicle information (type, plate#, model, size & color)"
        }
        showAddButton={true}
        addButtonTitle='Add new vehicle'
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
          title={"New Vehicle Registration"}
          open
          onClose={() => {
            setOpenDrawer(false);
            setDrawerContent(null);
          }}
          width={600}
          buttonTitle={selectedVehicle ? "Update" : "Save"}
          form={mainForm}
        >
          <VehicleForm
            data={selectedVehicle}
            form={mainForm}
            onComplete={() => {
              setOpenDrawer(false);
              setDrawerContent(null);
            }}
          />
        </Drawer>
      )}
    </>
  );
};

export default Vehicles;
