import { Table as MainTable } from "antd";
import TableHeaderBar from "./tableHeaderBar";

export const Table = ({
  data,
  columns,
  rowKey,
  placeholderText,
  onSearchInputChange,
  onAddButtonClicked,
  addButtonTitle,
  loading,
}: {
  data: any[];
  columns: {
    title: string;
    dataIndex: string;
    key: string;
  }[];
  rowKey: string;
  placeholderText: string;
  onSearchInputChange: (value: string) => void;
  onAddButtonClicked: () => void;
  addButtonTitle: string;
  loading: boolean;
}) => {
  return (
    <>
      <TableHeaderBar
        onSearchInputChange={(value: string) => {
          onSearchInputChange(value);
        }}
        placeholder={placeholderText}
        onAddButtonClicked={() => {
          onAddButtonClicked();
        }}
        addButtonTitle={addButtonTitle}
      />
      <MainTable
        dataSource={data}
        columns={columns}
        rowKey={rowKey}
        loading={loading}
      />
    </>
  );
};
