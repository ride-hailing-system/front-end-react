import { Button, Drawer as MainDrawer } from "antd";

const Drawer = ({
  title,
  isEdit,
  onClose,
  form,
  children,
  open,
  width = 400,
}: {
  title: string | React.ReactNode;
  isEdit?: boolean;
  onClose: () => void;
  form?: any;
  children: React.ReactNode;
  open: boolean;
  width?: number;
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
          loading={form.getFieldValue("loading") ? true : false}
        >
          {isEdit ? "Save Changes" : "Create"}
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
