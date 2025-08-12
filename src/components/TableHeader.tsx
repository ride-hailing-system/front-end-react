import React, { type ReactElement } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { AddButton } from "./AddButton";

const TableHeader = ({
  onSearchInputChange,
  placeholder,
  value,
  onAddButtonClicked,
  addButtonTitle,
  showAddButton,
  showSearchInput,
  FilterOption,
}: {
  onSearchInputChange: (value: string) => void;
  placeholder: string;
  value?: string;
  onAddButtonClicked: () => void;
  addButtonTitle: string;
  showAddButton: boolean;
  showSearchInput: boolean;
  FilterOption?: ReactElement;
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
    <div className='flex items-center justify-between p-4 rounded-lg shadow-main bg-white gap-2'>
      {showSearchInput ? (
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
          addonAfter={FilterOption && FilterOption}
        />
      ) : (
        <div></div>
      )}
      {showAddButton && (
        <AddButton
          onClick={() => onAddButtonClicked()}
          title={addButtonTitle}
        />
      )}
    </div>
  );
};

export default TableHeader;
