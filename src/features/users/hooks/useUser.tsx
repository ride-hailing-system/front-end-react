import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, type MenuProps } from 'antd';
import UserProfile from '../../../components/UserProfileInfo';
import AccountStatus from '../../../components/StatusIndicator';
import { ActionMenu } from '../../../components/ActionMenu';

export const getActionMenus = ({
  record,
  onEdit,
  onSuspend,
  onDelete,
  onViewDetail,
}: {
  record: any;
  onEdit: () => void;
  onSuspend: () => void;
  onDelete: () => void;
  onViewDetail: () => void;
}): MenuProps['items'] => {
  return [
    record?.role === 'user'
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
            onEdit();
          },
          key: '0',
        }
      : null,
    record?.status === 'active'
      ? {
          label: (
            <div className="flex items-center gap-2">
              <Icon
                icon={
                  record?.status === 'suspended'
                    ? 'mdi:account-reactivate-outline'
                    : 'mdi:account-off-outline'
                }
                width={25}
                height={25}
                className="text-gray-700"
              />
              <span className="text-gray-700 font-semibold">
                {record?.status === 'suspended'
                  ? 'Reinstate account'
                  : 'Suspend account'}
              </span>
            </div>
          ),
          onClick: () => {
            onSuspend();
          },
          key: '1',
        }
      : null,
    {
      label: (
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:delete-outline"
            width={20}
            height={20}
            className="text-red-700"
          />
          <span className="text-red-700">Delete account</span>
        </div>
      ),
      onClick: () => {
        onDelete();
      },
      key: '2',
    },
    record?.role !== 'user'
      ? {
          type: 'divider',
        }
      : null,
    record?.role !== 'user'
      ? {
          label: (
            <div>
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:information-outline"
                  width={20}
                  height={20}
                  className="text-gray-700"
                />
                <span className="text-gray-700 font-semibold">
                  View details
                </span>
              </div>
            </div>
          ),
          onClick: () => {
            onViewDetail();
          },
          key: '3',
        }
      : null,
  ];
};

export const useUser = () => {
  const lableInfos = {
    user: {
      addButtonTitle: 'Add new User',
      placeholderText:
        'Search by user information (first name, last name, email & phone number)',
    },
    driver: {
      addButtonTitle: 'Add new Driver',
      placeholderText:
        'Search by driver information (first name, last name, email & phone number)',
    },
    rider: {
      addButtonTitle: 'Add new Rider',
      placeholderText:
        'Search by rider information (first name, last name, email & phone number)',
    },
  };

  const suspensionReasons = [
    { text: 'Violation of terms', value: 'Violation of terms' },
    { text: 'Abusive behavior', value: 'Abusive behavior' },
    { text: 'Suspicious activity', value: 'Suspicious activity' },
    {
      text: 'Fraudulent payment activity',
      value: 'Fraudulent payment activity',
    },
    { text: 'Unsafe driving practices', value: 'Unsafe driving practices' },
    { text: 'Vehicle non-compliance', value: 'Vehicle non-compliance' },
    {
      text: 'Multiple ride cancellations',
      value: 'Multiple ride cancellations',
    },
    { text: 'Customer complaints', value: 'Customer complaints' },
    { text: 'Other (specify)', value: 'Other' },
  ];

  const getTableColumns = ({
    onEdit,
    onSuspend,
    onDelete,
    onViewDetail,
    onRestoreAccount,
  }: {
    onEdit: (record: any) => void;
    onSuspend: (record: any) => void;
    onDelete: (record: any) => void;
    onViewDetail: (record: any) => void;
    onRestoreAccount: (record: any) => void;
  }): any[] => {
    return [
      {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        render: (_: string, record: any) => (
          <UserProfile
            firstName={record?.firstName}
            lastName={record?.lastName}
            photoUrl={record?.photoUrl}
            link={
              record?.role === 'driver'
                ? `/admin/driver-detail/${record?._id}`
                : undefined
            }
          />
        ),
      },
      {
        title: 'Phone #',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (_: string, record: any) => (
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:phone"
              width={25}
              height={25}
              className="text-gray-700"
            />
            <span className="text-sm">{record?.phoneNumber}</span>
          </div>
        ),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (_: string, record: any) => (
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:email"
              width={25}
              height={25}
              className="text-gray-700"
            />
            <span className="text-sm">{record?.email}</span>
          </div>
        ),
      },
      {
        title: 'Account status',
        dataIndex: 'status',
        key: 'status',
        render: (_: string, record: any) => {
          return <AccountStatus status={record?.status} />;
        },
      },
      {
        title: 'More',
        key: 'more',
        render: (record: any) => {
          return (
            <>
              {record?.status === 'deleted' ? (
                <Button
                  type="default"
                  icon={
                    <Icon icon="hugeicons:restore-bin" width={20} height={20} />
                  }
                  danger
                  onClick={() => {
                    onRestoreAccount(record);
                  }}
                >
                  Restore
                </Button>
              ) : (
                <ActionMenu
                  menuItems={getActionMenus({
                    record,
                    onEdit: () => {
                      onEdit(record);
                    },
                    onSuspend: () => {
                      onSuspend(record);
                    },
                    onDelete: () => {
                      onDelete(record);
                    },
                    onViewDetail: () => {
                      onViewDetail(record);
                    },
                  })}
                />
              )}
            </>
          );
        },
      },
    ];
  };

  return {
    lableInfos,
    suspensionReasons,
    getTableColumns,
  };
};
