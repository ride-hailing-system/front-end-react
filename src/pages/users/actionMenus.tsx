import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dropdown,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  type MenuProps,
} from "antd";
import toast from "react-hot-toast";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import { Drawer } from "../../components/drawer";
import { useState } from "react";
import { GET_USERS } from "../../graphql/queries/user";
import { UPDATE_USER } from "../../graphql/mutations/user";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export const ActionMenus = ({
  record,
  onEdit,
}: {
  record: any;
  onEdit: () => void;
}) => {
  const navigate = useNavigate();

  const [isSuspendFormVisible, setIsSuspendFormVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const items: MenuProps["items"] = [
    record?.role === "user"
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
                Edit this user
              </span>
            </div>
          ),
          onClick: () => {
            onEdit();
          },
          key: "0",
        }
      : null,
    record?.status === "active"
      ? {
          label: (
            <div className='flex items-center gap-2'>
              <Icon
                icon={
                  record?.status === "suspended"
                    ? "mdi:account-reactivate-outline"
                    : "mdi:account-off-outline"
                }
                width={25}
                height={25}
                className='text-gray-700'
              />
              <span className='text-gray-700 font-semibold'>
                {record?.status === "suspended"
                  ? "Reinstate this user"
                  : "Suspend this user"}
              </span>
            </div>
          ),
          onClick: () => {
            setIsSuspendFormVisible(true);
          },
          key: "1",
        }
      : null,
    {
      label: (
        <div className='flex items-center gap-2'>
          <Icon
            icon='mdi:delete-outline'
            width={20}
            height={20}
            className='text-red-700'
          />
          <span className='text-red-700'>Delete this user</span>
        </div>
      ),
      onClick: () => {
        setIsDeleteModalVisible(true);
      },
      key: "2",
    },
    {
      type: "divider",
    },
    record?.role !== "user"
      ? {
          label: (
            <div>
              <div className='flex items-center gap-2'>
                <Icon
                  icon='mdi:information-outline'
                  width={20}
                  height={20}
                  className='text-gray-700'
                />
                <span className='text-gray-700 font-semibold'>
                  View details
                </span>
              </div>
            </div>
          ),
          onClick: () => {
            toast.success("View details action clicked");
            navigate(`/admin/driver-detail/${record?._id}`);
          },
          key: "3",
        }
      : null,
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Icon
              icon='mdi:dots-vertical-circle-outline'
              width={30}
              height={30}
              className='text-gray-700'
            />
          </Space>
        </a>
      </Dropdown>
      <HandleSuspendUser
        record={record}
        open={isSuspendFormVisible}
        onClose={() => {
          setIsSuspendFormVisible(false);
        }}
      />
      <HandleDeleteUser
        record={record}
        open={isDeleteModalVisible}
        onSuccess={() => {
          setIsDeleteModalVisible(false);
        }}
        onCancel={() => {
          setIsDeleteModalVisible(false);
        }}
      />
    </>
  );
};

export const HandleSuspendUser = ({
  record,
  open,
  onClose,
}: {
  record: any;
  open: boolean;
  onClose: () => void;
}) => {
  const isSuspended: boolean = record?.status === "suspended";

  const warningMessage: string = isSuspended
    ? "Reinstating this user account will restore their access to the platform. Please ensure this action aligns with your platform’s policies before proceeding."
    : "Suspending a user account will prevent them from accessing the platform. Please ensure the action complies with platform policies before confirming suspension.";

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USERS],
    onCompleted: () => {
      toast.success("User suspended successfully");
      handleOnClose();
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const handleSuspend = async (values: any) => {
    try {
      await updateUser({
        variables: values,
      });
    } catch (error: any) {
      toast.error(error.message || "An error occurred while updating the user");
    }
  };

  const [mainForm] = Form.useForm();
  const [otherSelected, setOtherSelected] = useState(false);

  const { Option } = Select;

  const suspensionReasons = [
    { text: "Violation of terms", value: "Violation of terms" },
    { text: "Abusive behavior", value: "Abusive behavior" },
    { text: "Suspicious activity", value: "Suspicious activity" },
    {
      text: "Fraudulent payment activity",
      value: "Fraudulent payment activity",
    },
    { text: "Unsafe driving practices", value: "Unsafe driving practices" },
    { text: "Vehicle non-compliance", value: "Vehicle non-compliance" },
    {
      text: "Multiple ride cancellations",
      value: "Multiple ride cancellations",
    },
    { text: "Customer complaints", value: "Customer complaints" },
    { text: "Other (specify)", value: "Other" },
  ];

  const handleOnClose = () => {
    onClose();
    mainForm.resetFields();
  };

  return (
    <Drawer
      title={
        <span className=''>
          {isSuspended ? "Reinstate User Account" : "Suspend User Account"}
        </span>
      }
      open={open}
      onClose={handleOnClose}
      isEdit={false}
      form={mainForm}
      buttonDanger={isSuspended ? false : true}
      buttonTitle={isSuspended ? "Reinstate" : "Suspend"}
    >
      <Form
        layout='vertical'
        onFinish={handleSuspend}
        form={mainForm}
        requiredMark={false}
        initialValues={{
          _id: record?._id,
          suspendReason: isSuspended ? undefined : suspensionReasons[0]?.value,
          additionalInfo: isSuspended ? undefined : record?.additionalInfo,
          status: isSuspended ? "active" : "suspended",
        }}
      >
        <div
          className={`font-light mb-4 ${
            isSuspended
              ? "text-green-600 border-green-600"
              : "text-red-600 border-red-600"
          } border-2 p-2 rounded-md`}
        >
          <p>
            <span className='font-semibold'>Warning:</span> {warningMessage}
          </p>
        </div>
        <Form.Item name='_id' hidden>
          <Input hidden />
        </Form.Item>
        {!isSuspended && (
          <Form.Item
            name='suspendReason'
            label='Please select a suspension reason'
            rules={[{ required: true, message: "Please select a reason" }]}
          >
            <Select
              placeholder='Select a reason'
              onChange={(value) => {
                if (value === "Other") {
                  setOtherSelected(true);
                } else {
                  setOtherSelected(false);
                  mainForm.resetFields(["additionalInfo"]);
                }
              }}
              size='large'
              className='w-full'
            >
              {suspensionReasons.map(
                (item: { text: string; value: string }) => (
                  <Option key={item?.value} value={item?.value}>
                    {item?.text}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          name='additionalInfo'
          label={
            otherSelected
              ? "Please specify reason"
              : "Add additional information"
          }
          rules={[
            { required: otherSelected, message: "Please provide a reason" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export const HandleDeleteUser = ({
  record,
  open,
  onCancel,
  onSuccess,
}: {
  record: any;
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}) => {
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USERS],
    onCompleted: () => {
      toast.success("User deleted successfully");
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const handleDelete = async () => {
    try {
      await updateUser({
        variables: {
          _id: record?._id,
          status: "deleted",
        },
      });
    } catch (error: any) {
      toast.error(error.message || "An error occurred while updating the user");
    }
  };

  return (
    <Popconfirm
      title='Are you sure you want to delete this user ?'
      description={
        <span className='font-semibold underline'>{`${record?.firstName} ${record?.lastName}.`}</span>
      }
      onConfirm={() => {
        handleDelete();
      }}
      onCancel={() => {
        onCancel();
      }}
      icon={null}
      okType='danger'
      okText='Yes, delete'
      cancelText='No, cancel'
      open={open}
      placement='bottomRight'
    />
  );
};
