import { Table as MainTable } from "antd";

export const Table = ({
  data,
  columns,
  rowKey,
  loading,
}: {
  data: any[];
  columns: any[];
  rowKey: string;
  loading: boolean;
}) => {
  return (
    <MainTable
      dataSource={data}
      columns={columns}
      rowKey={rowKey}
      loading={loading}
    />
  );
};
