import { Select as MainSelect } from 'antd';

type selectType = { text: string; value: string };

export const Select = ({
  data,
  placeholderText,
  onChange,
  classNames,
}: {
  data: selectType[];
  placeholderText: string;
  onChange: (value: any) => void;
  classNames?: string;
}) => {
  const { Option } = MainSelect;

  return (
    <div className="flex justify-end">
      <MainSelect
        placeholder={placeholderText}
        size="large"
        className={`${classNames}`}
        onChange={onChange}
      >
        {data.map((item: selectType) => (
          <Option key={item?.value} value={item?.value}>
            {item?.text}
          </Option>
        ))}
      </MainSelect>
    </div>
  );
};
