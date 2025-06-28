import { Button, Drawer as MainDrawer } from "antd";

const Drawer = ({
  title,
  isEdit,
  onClose,
  form,
  children,
  open,
  width = 400,
  buttonTitle,
  buttonDanger = false,
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
}) => {
  return (
    <MainDrawer
      title={title}
      open={open}
      onClose={() => {
        onClose();
      }}
      footer={
        <Button
          htmlType='button'
          className='h-10 w-full'
          type='primary'
          onClick={() => {
            form.submit();
          }}
          loading={form && form.getFieldValue("loading") ? true : false}
          size='large'
          danger={buttonDanger}
        >
          {buttonTitle ? buttonTitle : isEdit ? "Save Changes" : "Create"}
        </Button>
      }
      maskClosable={false}
      width={width}
    >
      {children}
    </MainDrawer>
  );
};

export default Drawer;
