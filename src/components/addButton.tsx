import { Button } from "antd";

export const AddButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <Button
      className='!text-white !bg-primary h-10'
      onClick={() => onClick}
      style={{ marginLeft: 16 }}
    >
      {title}
    </Button>
  );
};
