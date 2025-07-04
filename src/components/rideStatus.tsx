type RideStatusProps = {
  status: string | undefined;
  customStyles?: string;
};

const RideStatus = ({ status, customStyles }: RideStatusProps) => {
  const statusColors = {
    requested: "text-blue-500",
    accepted: "text-green-900",
    rejected: "text-red-900",
    ongoing: "text-yellow-900",
    completed: "text-green-900",
    canceled: "text-red-900",
  };

  const statusBg = {
    requested: "bg-blue-200",
    accepted: "bg-green-200",
    rejected: "bg-red-200",
    ongoing: "bg-yellow-200",
    completed: "bg-green-200",
    canceled: "bg-red-200",
  };

  const statusLabels = {
    requested: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    ongoing: "Started",
    completed: "Completed",
    canceled: "Canceled",
  };

  // @ts-ignore
  const colorClass = status ? statusColors[status] : "text-gray-500";
  // @ts-ignore
  const statusBgClass = status ? statusBg[status] : "bg-gray-200";
  // @ts-ignore
  const label = status ? statusLabels[status] : "Incomplete";

  return (
    <div
      className={`${
        customStyles ?? "px-5 py-2"
      } rounded-full  text-center ${statusBgClass}`}
    >
      <span className={`capitalize ${colorClass} font-semibold text-sm`}>
        {label}
      </span>
    </div>
  );
};

export default RideStatus;
