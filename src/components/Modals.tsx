import { useContext, useEffect } from "react";
import { Modal } from "antd";
import {
  ConfirmationModalContext,
  defaultConfirmationModalProps,
  type ConfirmationModalPropsType,
} from "../store/context/confirmationModalContext";

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
          ...defaultConfirmationModalProps,
        }));
        cmProps?.onOk && cmProps?.onOk();
      },
      onCancel() {
        setcmProps((prev: ConfirmationModalPropsType) => ({
          ...prev,
          ...defaultConfirmationModalProps,
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
