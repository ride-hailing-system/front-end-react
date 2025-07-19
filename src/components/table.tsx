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
  showHeaderBar = true,
  emptyComponent,
  showSearchInput = true,
}: {
  data: any[];
  columns: {
    title: string;
    dataIndex: string;
    key: string;
  }[];
  rowKey?: string;
  placeholderText?: string;
  onSearchInputChange?: (value: string) => void;
  onAddButtonClicked?: () => void;
  addButtonTitle?: string;
  loading: boolean;
  showAddButton?: boolean;
  showHeaderBar?: boolean;
  emptyComponent?: any;
  showSearchInput?: boolean;
}) => {
  return (
    <>
      {showHeaderBar && (
        <TableHeaderBar
          onSearchInputChange={(value: string) => {
            onSearchInputChange && onSearchInputChange(value);
          }}
          placeholder={placeholderText ? placeholderText : ""}
          onAddButtonClicked={() => {
            onAddButtonClicked && onAddButtonClicked();
          }}
          addButtonTitle={addButtonTitle ? addButtonTitle : ""}
          showAddButton={showAddButton}
          showSearchInput={showSearchInput}
        />
      )}
      <MainTable
        dataSource={data}
        columns={columns}
        rowKey={rowKey}
        loading={loading}
        locale={{
          emptyText: emptyComponent && emptyComponent,
        }}
      />
    </>
  );
};
