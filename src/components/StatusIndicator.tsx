type RideStatusProps = {
  status?: string;
  customStyles?: string;
};

const StatusIndicator = ({ status, customStyles }: RideStatusProps) => {
  const statusColors: Record<string, string> = {
    active: "text-green-700",
    inactive: "text-gray-500",
    suspended: "text-yellow-700",
    deleted: "text-red-600",
    // for ride
    requested: "text-blue-500",
    accepted: "text-green-900",
    rejected: "text-red-900",
    ongoing: "text-yellow-900",
    completed: "text-green-900",
    canceled: "text-red-900",
  };

  const statusBg: Record<string, string> = {
    active: "bg-green-100",
    inactive: "bg-gray-200",
    suspended: "bg-yellow-100",
    deleted: "bg-red-100",
    // for ride
    requested: "bg-blue-200",
    accepted: "bg-green-200",
    rejected: "bg-red-200",
    ongoing: "bg-yellow-200",
    completed: "bg-green-200",
    canceled: "bg-red-200",
  };

  const statusLabels: Record<string, string> = {
    active: "Active",
    inactive: "Inactive",
    suspended: "Suspended",
    deleted: "Deleted",
    // For ride
    requested: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    ongoing: "Started",
    completed: "Completed",
    canceled: "Canceled",
  };

  const colorClass = statusColors[status || ""] || "text-gray-500";
  const statusBgClass = statusBg[status || ""] || "bg-gray-200";
  const label = statusLabels[status || ""] || "Unknown";

  return (
    <div
      className={`${
        customStyles ?? "px-5 py-2"
      } rounded-full text-center ${statusBgClass}`}
    >
      <span className={`capitalize ${colorClass} font-semibold text-sm`}>
        {label}
      </span>
    </div>
  );
};

export default StatusIndicator;
