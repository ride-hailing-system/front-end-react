import { useContext, useEffect } from "react";
import { Modal } from "antd";
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from "../context/confirmationModalContext";

const ConfirmationModal = () => {
  const [modal, contextHolder] = Modal.useModal();

  const {
    confirmationModalProps: cmProps,
    setConfirmationModalProps: setcmProps,
  } = useContext(ConfirmationModalContext);

  useEffect(() => {
    if (!cmProps?.show) return;

    modal.confirm({
      title: cmProps?.title,
      content: cmProps?.content,
      onOk() {
        setcmProps((prev: ConfirmationModalPropsType) => ({
          ...prev,
          show: false,
        }));
        cmProps?.onOk && cmProps?.onOk();
      },
      onCancel() {
        setcmProps((prev: ConfirmationModalPropsType) => ({
          ...prev,
          show: false,
        }));
        cmProps?.onCancel && cmProps?.onCancel();
      },
      okText: cmProps?.okButtonText,
      cancelText: cmProps?.cancelButtonText,
      okButtonProps: { danger: true, type: "default" },
      cancelButtonProps: { type: "primary" },
      icon: null,
    });
  }, [cmProps?.show]);

  return <>{contextHolder}</>;
};

export default ConfirmationModal;
