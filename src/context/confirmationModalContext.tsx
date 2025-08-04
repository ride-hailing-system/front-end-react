import React, {
  createContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

export type ConfirmationModalPropsType = {
  show?: boolean;
  title?: string;
  content?: string | ReactElement;
  okButtonText?: string;
  cancelButtonText?: string;
  onOk: () => void;
  onCancel: () => void;
};

export type ConfirmationModalContextType = {
  confirmationModalProps: ConfirmationModalPropsType;
  setConfirmationModalProps: React.Dispatch<
    React.SetStateAction<ConfirmationModalPropsType>
  >;
};

export const ConfirmationModalContext =
  createContext<ConfirmationModalContextType>({
    confirmationModalProps: {
      title: "",
      content: "",
      okButtonText: "",
      cancelButtonText: "",
      show: false,
      onOk: () => {},
      onCancel: () => {},
    },
    setConfirmationModalProps: () => {},
  });

export const defaultConfirmationModalProps: ConfirmationModalPropsType = {
  title: "Confirmation",
  content: "Are you sure want to delete this?",
  okButtonText: "Yes, delete",
  cancelButtonText: "No, leave it that.",
  show: false,
  onOk: () => {},
  onCancel: () => {},
};

export const ConfirmationModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalPropsType>({
      ...defaultConfirmationModalProps,
    });

  return (
    <ConfirmationModalContext.Provider
      value={{ confirmationModalProps, setConfirmationModalProps }}
    >
      {children}
    </ConfirmationModalContext.Provider>
  );
};
