import { Icon } from '@iconify/react/dist/iconify.js';
import type { MenuProps } from 'antd';
import UserProfileInfo from '../../../components/UserProfileInfo';
import StatusIndicator from '../../../components/StatusIndicator';
import dayjs from 'dayjs';
import { ActionMenu } from '../../../components/ActionMenu';

const getActionMenus = ({
  record,
  onEdit,
  onDelete,
  onViewDetail,
}: {
  record: any;
  onEdit: (record: any) => void;
  onDelete: (record: any) => void;
  onViewDetail: (record: any) => void;
}): MenuProps['items'] => {
  return [
    record?.createdByAdmin
      ? {
          label: (
            <div className="flex items-center gap-2">
              <Icon
                icon="basil:edit-outline"
                width={20}
                height={20}
                className="text-gray-700"
              />
              <span className="text-gray-700 font-semibold">
                Edit Information
              </span>
            </div>
          ),
          onClick: () => {
            onEdit(record);
          },
          key: '0',
        }
      : null,
    record?.createdByAdmin
      ? {
          label: (
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:delete-outline"
                width={20}
                height={20}
                className="text-red-600"
              />
              <span className="text-red-700 font-light">Delete request</span>
            </div>
          ),
          onClick: () => {
            onDelete(record);
          },
          key: '1',
        }
      : null,
    record?.createdByAdmin
      ? {
          type: 'divider',
        }
      : null,
    {
      label: (
        <div>
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:information-outline"
              width={20}
              height={20}
              className="text-gray-700"
            />
            <span className="text-gray-700 font-semibold">View details</span>
          </div>
        </div>
      ),
      onClick: () => {
        onViewDetail(record);
      },
      key: '2',
    },
  ];
};

export const useRide = () => {
  const getTableColumns = ({
    onEdit,
    onDelete,
    onViewDetail,
  }: {
    onEdit: (record: any) => void;
    onDelete: (record: any) => void;
    onViewDetail: (record: any) => void;
  }): any[] => {
    return [
      {
        title: 'Rider',
        dataIndex: 'rider',
        key: 'rider',
        render: (_: string, record: any) => (
          <UserProfileInfo
            firstName={record?.riderInfo?.firstName}
            lastName={record?.riderInfo?.lastName}
            photoUrl={record?.riderInfo?.photoUrl}
          />
        ),
      },
      {
        title: 'Driver',
        dataIndex: 'driver',
        key: 'driver',
        render: (_: string, record: any) => {
          if (!record?.driverInfo)
            return (
              <p className="flex items-center justify-center font-light border-solid border-gray-300 rounded-lg p-2">
                <span className="text-red-500">No driver assigned</span>
              </p>
            );
          return (
            <UserProfileInfo
              firstName={record?.driverInfo?.firstName}
              lastName={record?.driverInfo?.lastName}
              photoUrl={record?.driverInfo?.photoUrl}
              link={`/admin/driver-detail/${record?.driverInfo?._id}`}
            />
          );
        },
      },
      {
        title: 'Estimated Fare',
        dataIndex: 'fare',
        key: 'fare',
        render: (record: any) => {
          return <p className="font-bold">{`${record} ETB`}</p>;
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_: string, record: any) => {
          return <StatusIndicator status={record?.status} />;
        },
      },
      {
        title: 'Requested At',
        dataIndex: 'requestedAt',
        key: 'requestedAt',
        render: (record: any) => (
          <p className="">
            {dayjs(record?.requestedAt).format('YYYY/MM/DD HH:mm')}
          </p>
        ),
      },
      {
        title: 'More',
        key: 'action',
        render: (record: any) => (
          <>
            <ActionMenu
              menuItems={getActionMenus({
                record,
                onEdit: (record: any) => {
                  onEdit(record);
                },
                onDelete: (record: any) => {
                  onDelete(record);
                },
                onViewDetail: (record: any) => {
                  onViewDetail(record);
                },
              })}
            />
          </>
        ),
      },
    ];
  };

  return {
    getActionMenus,
    getTableColumns,
  };
};
