import { Icon } from "@iconify/react/dist/iconify.js";
import type { MenuProps } from "antd";

export const getActionMenus = ({
  record,
  onEdit,
  onDelete,
  onViewDetail,
}: {
  record: any;
  onEdit: (record: any) => void;
  onDelete: (record: any) => void;
  onViewDetail: (record: any) => void;
}): MenuProps["items"] => {
  return [
    record?.createdByAdmin
      ? {
          label: (
            <div className='flex items-center gap-2'>
              <Icon
                icon='basil:edit-outline'
                width={20}
                height={20}
                className='text-gray-700'
              />
              <span className='text-gray-700 font-semibold'>
                Edit Information
              </span>
            </div>
          ),
          onClick: () => {
            onEdit(record);
          },
          key: "0",
        }
      : null,
    record?.createdByAdmin
      ? {
          label: (
            <div className='flex items-center gap-2'>
              <Icon
                icon='mdi:delete-outline'
                width={20}
                height={20}
                className='text-red-600'
              />
              <span className='text-red-700 font-light'>Delete request</span>
            </div>
          ),
          onClick: () => {
            onDelete(record);
          },
          key: "1",
        }
      : null,
    record?.createdByAdmin
      ? {
          type: "divider",
        }
      : null,
    {
      label: (
        <div>
          <div className='flex items-center gap-2'>
            <Icon
              icon='mdi:information-outline'
              width={20}
              height={20}
              className='text-gray-700'
            />
            <span className='text-gray-700 font-semibold'>View details</span>
          </div>
        </div>
      ),
      onClick: () => {
        onViewDetail(record);
      },
      key: "2",
    },
  ];
};
