type RideStatusProps = {
  status?: string;
  customStyles?: string;
};

const AccountStatus = ({ status, customStyles }: RideStatusProps) => {
  const statusColors: Record<string, string> = {
    active: "text-green-700",
    inactive: "text-gray-500",
    suspended: "text-yellow-700",
    deleted: "text-red-600",
  };

  const statusBg: Record<string, string> = {
    active: "bg-green-100",
    inactive: "bg-gray-200",
    suspended: "bg-yellow-100",
    deleted: "bg-red-100",
  };

  const statusLabels: Record<string, string> = {
    active: "Active",
    inactive: "Inactive",
    suspended: "Suspended",
    deleted: "Deleted",
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

export default AccountStatus;
