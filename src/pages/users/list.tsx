import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { LocalSearch } from "../../utils/localSearch";
import { Table } from "../../components/table";
import { GET_USERS } from "../../graphql/queries/user";
import EntryForm from "./entryForm";

const List = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const { data, loading } = useQuery(GET_USERS, {
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.users) {
      if (searchValue) {
        const result = LocalSearch({ searchValue }, data?.users, [
          "firstName",
          "lastName",
        ]);
        setUsers(result);
      } else {
        setUsers(data?.users);
      }
    }
  }, [searchValue, data]);

  const columns: any[] = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <>
          <Button
            className='mr-3'
            onClick={() => {
              setSelectedUser(record);
              setOpenDrawer(true);
            }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  const [form] = Form.useForm();

  return (
    <>
      <Table
        data={users}
        columns={columns}
        rowKey='id'
        loading={loading}
        onSearchInputChange={(value: string) => {
          setSearchValue(value);
        }}
        placeholderText='Search by user information (first name, last name)'
        onAddButtonClicked={() => {
          setOpenDrawer(true);
        }}
        addButtonTitle='Add new User'
      />
      {openDrawer && (
        <EntryForm
          data={selectedUser}
          onClose={() => {
            setOpenDrawer(false);
            form.resetFields();
            setSelectedUser(null);
          }}
          onComplete={() => {
            setOpenDrawer(false);
            form.resetFields();
            setSelectedUser(null);
          }}
          form={form}
        />
      )}
    </>
  );
};

export default List;
