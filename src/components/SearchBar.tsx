import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const SearchBar = ({
  onChange,
  placeholder,
  value,
}: {
  onChange: (value: string) => void;
  placeholder: string;
  value?: string;
}) => {
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value) {
      onChange(event.currentTarget.value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex-1 mr-4">
      <Input
        placeholder={placeholder}
        prefix={
          <SearchOutlined
            style={{
              color: 'gray',
              marginRight: 5,
            }}
            width={20}
            height={20}
          />
        }
        className="text-lg"
        size="large"
        onKeyDown={handleEnter}
        allowClear
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default SearchBar;
