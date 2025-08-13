import { Icon } from '@iconify/react/dist/iconify.js';
import { Dropdown, Space, type MenuProps } from 'antd';

export const ActionMenu = ({
  menuItems,
}: {
  menuItems?: MenuProps['items'];
}) => {
  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              type: 'group',
              label: (
                <span className="text-gray-700 font-light">
                  Available actions
                </span>
              ),
            },
            {
              type: 'divider',
            },
            ...(menuItems ?? []),
          ],
        }}
        trigger={['click']}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Icon
              icon="mdi:dots-vertical-circle-outline"
              width={30}
              height={30}
              className="text-gray-700"
            />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};
