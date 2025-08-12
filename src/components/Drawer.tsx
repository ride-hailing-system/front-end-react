import { Button, Drawer as MainDrawer } from "antd";

export const Drawer = ({
  title,
  isEdit,
  onClose,
  form,
  children,
  open,
  width = 400,
  buttonTitle,
  buttonDanger = false,
  loading,
  footer,
}: {
  title: string | React.ReactNode;
  isEdit?: boolean;
  onClose: () => void;
  form?: any;
  children: React.ReactNode;
  open: boolean;
  width?: number;
  buttonTitle?: string;
  buttonDanger?: boolean;
  loading?: boolean;
  footer?: React.ReactNode;
}) => {
  return (
    <MainDrawer
      title={title}
      open={open}
      onClose={() => {
        onClose();
      }}
      footer={
        footer ?? (
          <Button
            htmlType='button'
            className='h-10 w-full'
            type='primary'
            onClick={() => {
              form.submit();
            }}
            loading={loading}
            size='large'
            danger={buttonDanger}
          >
            {buttonTitle ? buttonTitle : isEdit ? "Save Changes" : "Create"}
          </Button>
        )
      }
      maskClosable={false}
      width={width}
    >
      {children}
    </MainDrawer>
  );
};
