import { useLazyQuery, useMutation } from "@apollo/client";
import { Form, Collapse, Button, Spin } from "antd";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import { SAVE_SETTING } from "../../graphql/mutations/setting";
import toast from "react-hot-toast";
import { GET_SETTING } from "../../graphql/queries/setting";
import { useContext, useEffect, useState } from "react";
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from "../../context/confirmationModalContext";
import { ConfirmationPassword } from "../../components/passwordInput";
import General from "./subComponents/general";
import Location from "./subComponents/location";
import Ride from "./subComponents/ride";
import Payment from "./subComponents/payment";
import User from "./subComponents/user";
import Notification from "./subComponents/notification";
import Templates from "./subComponents/template";

const { Panel } = Collapse;

const SettingsForm = () => {
  const [form] = Form.useForm(undefined);
  const [passwordConfirmationForm] = Form.useForm(undefined);

  const [loading, setLoading] = useState(false);

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext
  );

  const [getSetting, { loading: gettingSetting }] = useLazyQuery(GET_SETTING, {
    fetchPolicy: "network-only",
    onCompleted: (data: any) => {
      console.log(data);
      form.setFieldsValue(data?.getSetting);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  useEffect(() => {
    getSetting();
  }, []);

  useEffect(() => {
    setLoading(gettingSetting);
  }, [gettingSetting]);

  const [saveSetting] = useMutation(SAVE_SETTING, {
    onCompleted: () => {
      toast.success("Setting saved successfully.");
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  const onFinish = async (values: any) => {
    setcmProps((prev: ConfirmationModalPropsType) => ({
      ...prev,
      title: "Confirmation",
      content: (
        <ConfirmationPassword
          onChange={(value: any) => {
            console.log(value);
          }}
          onSuccess={async () => {
            try {
              await saveSetting({
                variables: { ...values },
              });
            } catch (error: any) {
              toast.error(ApolloErrorFormatter(error, true).toString());
            }
          }}
          onLoading={(value: boolean) => {
            setLoading(value);
          }}
          form={passwordConfirmationForm}
        />
      ),
      okButtonText: "Submit",
      cancelButtonText: "Cancel",
      onOk: async () => {
        passwordConfirmationForm.submit();
        return passwordConfirmationForm
          .validateFields()
          .then(() => {
            return Promise.resolve(); // ✅ close modal
          })
          .catch(() => Promise.reject());
      },
      show: true,
    }));
  };

  return (
    <Spin spinning={loading} tip='Loading settings...'>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          general: { appName: "" },
          user: { requireKyc: false, requireDriverApproval: false },
          notification: {
            enableSms: false,
            enablePush: false,
            enableEmail: false,
          },
        }}
        requiredMark={false}
      >
        <Collapse
          defaultActiveKey={["1","2", "3", "4", "5", "6", "7"]}
          bordered={false}
          expandIconPosition='end'
          style={{
            backgroundColor: "transparent",
          }}
        >
          {/* general setting */}
          <Panel
            header={<strong className='text-lg'>General Settings</strong>}
            key='1'
            style={{ background: "transparent" }}
          >
            <General form={form} />
          </Panel>

          {/* location setting */}
          <Panel
            header={<strong className='text-lg'>Location Settings</strong>}
            key='2'
            style={{ background: "transparent" }}
          >
            <Location form={form} />
          </Panel>

          {/* ride setting */}
          <Panel
            header={<strong className='text-lg'>Ride Settings</strong>}
            key='3'
            style={{ background: "transparent" }}
          >
            <Ride form={form} />
          </Panel>

          {/* payment setting */}
          <Panel
            header={<strong className='text-lg'>Payment Settings</strong>}
            key='4'
            style={{ background: "transparent" }}
          >
            <Payment form={form} />
          </Panel>

          {/* user setting */}
          <Panel
            header={<strong className='text-lg'>User Settings</strong>}
            key='5'
            style={{ background: "transparent" }}
          >
            <User form={form} />
          </Panel>

          {/* notifications */}
          <Panel
            header={<strong className='text-lg'>Notification Settings</strong>}
            key='6'
            style={{ background: "transparent" }}
          >
            <Notification form={form} />
          </Panel>

          {/* templates */}
          <Panel
            header={<strong className='text-lg'>Message templates</strong>}
            key='7'
            style={{ background: "transparent" }}
          >
            <Templates form={form} />
          </Panel>
        </Collapse>

        <Form.Item style={{ marginTop: 24 }}>
          <Button type='primary' htmlType='submit' size='large'>
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default SettingsForm;
