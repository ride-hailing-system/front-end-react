import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../graphql/mutations/user";
import { GET_USERS } from "../../graphql/queries/user";
import toast from "react-hot-toast";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import { useState } from "react";
import { Form, Input, Select } from "antd";
import { Drawer } from "../../components/drawer";

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
