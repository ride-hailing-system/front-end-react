import { useLazyQuery, useMutation } from "@apollo/client";
import { Form, Collapse, Button, Spin } from "antd";
import { ApolloErrorFormatter } from "../../../graphql/apolloErrorFormatter";
import { SAVE_SETTING } from "../../../graphql/mutations/setting";
import toast from "react-hot-toast";
import { GET_SETTING } from "../../../graphql/queries/setting";
import { useContext, useEffect, useState, type ReactElement } from "react";

import { ConfirmationPassword } from "../../../components/PasswordInput";
import General from "./General";
import Location from "./Location";
import Ride from "./Ride";
import Payment from "./Payment";
import User from "./User";
import Notification from "./Notification";
import Templates from "./Template";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from "../../../store/context/confirmationModalContext";
import { SettingContext } from "../../../store/context/settingContext";
import { useGraphQL } from "../../../hooks/useGraphQL";

const SettingsForm = () => {
  const [form] = Form.useForm(undefined);
  const [passwordConfirmationForm] = Form.useForm(undefined);

  const [loading, setLoading] = useState(false);

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext
  );

  const { setSetting: setSystemSetting } = useContext(SettingContext);

  const { mutation } = useGraphQL();
  const { query } = useGraphQL();

  const { runQuery: getSetting, loading: gettingSetting } = query({
    queryStr: GET_SETTING,
    onSuccess: (data) => {
      form.setFieldsValue(data?.getSetting);
      setSystemSetting(data?.getSetting);
    },
  });

  const { runMutation: saveSetting, loading: savingSetting } = mutation({
    mutationStr: SAVE_SETTING,
    onSuccess: () => {
      toast.success("Setting saved successfully.");
    },
  });

  useEffect(() => {
    getSetting();
  }, []);

  useEffect(() => {
    setLoading(gettingSetting || savingSetting);
  }, [gettingSetting, savingSetting]);

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
            return Promise.resolve();
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
        disabled={gettingSetting}
      >
        <Collapse
          defaultActiveKey={["1", "2", "3", "4", "5", "6", "7"]}
          bordered={false}
          expandIconPosition='end'
          style={{
            backgroundColor: "transparent",
          }}
          expandIcon={({ isActive }) =>
            !isActive ? (
              <Icon icon='ph:caret-circle-down' width={30} height={30} />
            ) : (
              <Icon icon='ph:caret-circle-up' width={30} height={30} />
            )
          }
          items={[
            {
              key: "1",
              label: <strong className='text-lg'>General Settings</strong>,
              children: <General form={form} />,
            },
            {
              key: "2",
              label: <strong className='text-lg'>Location Settings</strong>,
              children: <Location form={form} />,
            },
            {
              key: "3",
              label: <strong className='text-lg'>Ride Settings</strong>,
              children: <Ride form={form} />,
            },
            {
              key: "4",
              label: <strong className='text-lg'>Payment Settings</strong>,
              children: <Payment form={form} />,
            },
            {
              key: "5",
              label: <strong className='text-lg'>User Settings</strong>,
              children: <User form={form} />,
            },
            {
              key: "6",
              label: <strong className='text-lg'>Notification Settings</strong>,
              children: <Notification form={form} />,
            },
            {
              key: "7",
              label: <strong className='text-lg'>Message templates</strong>,
              children: <Templates form={form} />,
            },
          ]}
        />
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
