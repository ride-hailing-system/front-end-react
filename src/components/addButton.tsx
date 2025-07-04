import { Button } from "antd";
import { Icon } from "@iconify/react";

export const AddButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <Button
      className='flex self-center justify-center'
      onClick={() => onClick()}
      style={{ marginLeft: 16 }}
      type='primary'
      icon={<Icon icon='gg:add' width={30} height={30} />}
      size="large"
      shape="default"
      data-testid="add-button"
      data-cy="add-button"
      aria-label="Add new item"
    >
      {title}
    </Button>
  );
};
