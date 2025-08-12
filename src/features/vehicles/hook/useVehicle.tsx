import { Button } from "antd";
import UserProfileInfo from "../../../components/UserProfileInfo";

export const useVehicle = () => {
  const getVehicleSize = [
    { text: "Small", value: "Small" },
    { text: "Medium", value: "Medium" },
    { text: "Large", value: "Large" },
  ];

  const getVehicleColor = [
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

  const getTableColumns = ({
    onEdit,
  }: {
    onEdit: (record: any) => void;
  }): any[] => [
    {
      title: "Driver",
      dataIndex: "driver",
      key: "driver",
      render: (_: string, record: any) => (
        <UserProfileInfo
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
      title: "Vehicle Identification #",
      dataIndex: "vin",
      key: "vin",
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
              onEdit(record);
            }}
            type='link'
          >
            Show details
          </Button>
        </>
      ),
    },
  ];

  return {
    getTableColumns,
    getVehicleSize,
    getVehicleColor,
  };
};
