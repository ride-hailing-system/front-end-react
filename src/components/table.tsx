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
  showAddButton = true,
}: {
  data: any[];
  columns: {
    title: string;
    dataIndex: string;
    key: string;
  }[];
  rowKey?: string;
  placeholderText: string;
  onSearchInputChange: (value: string) => void;
  onAddButtonClicked?: () => void;
  addButtonTitle?: string;
  loading: boolean;
  showAddButton: boolean;
}) => {
  return (
    <>
      <TableHeaderBar
        onSearchInputChange={(value: string) => {
          onSearchInputChange(value);
        }}
        placeholder={placeholderText}
        onAddButtonClicked={() => {
          onAddButtonClicked && onAddButtonClicked();
        }}
        addButtonTitle={addButtonTitle ? addButtonTitle : ""}
        showAddButton={showAddButton}
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
