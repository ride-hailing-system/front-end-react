import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { AddButton } from "./addButton";

const TableHeaderBar = ({
  onSearchInputChange,
  placeholder,
  value,
  onAddButtonClicked,
  addButtonTitle,
}: {
  onSearchInputChange: (value: string) => void;
  placeholder: string;
  value?: string;
  onAddButtonClicked: () => void;
  addButtonTitle: string;
}) => {
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      onSearchInputChange(event.currentTarget.value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange(event.target.value);
  };

  return (
    <div className='flex p-4 rounded-lg shadow-main bg-white mb-6'>
      <Input
        placeholder={placeholder}
        prefix={
          <SearchOutlined
            style={{
              color: "gray",
              marginRight: 5,
            }}
            width={20}
            height={20}
          />
        }
        className='text-lg'
        size='large'
        onKeyDown={handleEnter}
        allowClear
        onChange={handleChange}
        value={value}
      />
      <AddButton onClick={() => onAddButtonClicked()} title={addButtonTitle} />
    </div>
  );
};

export default TableHeaderBar;
