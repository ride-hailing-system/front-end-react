import { Avatar, Button, Form } from "antd";
import { useEffect, useState } from "react";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import { useLazyQuery, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { LocalSearch } from "../../utils/localSearch";
import { Table } from "../../components/table";
import { GET_USERS } from "../../graphql/queries/user";
import EntryForm from "./entryForm";
import { UserOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

const List = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const role: "user" | "driver" | "rider" | null =
    (searchParams.get("role") as "user" | "driver" | "rider") || null;

  const [getUsers, { loading }] = useLazyQuery(GET_USERS, {
    fetchPolicy: "network-only",
    onCompleted: (value: any) => {
      setUsers(value?.users || []);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  useEffect(() => {
    if (role) {
      getUsers({
        variables: {
          role,
        },
      });
    }
  }, [role]);

  useEffect(() => {
    if (users) {
      if (searchValue) {
        const result = LocalSearch({ searchValue }, users, [
          "firstName",
          "lastName",
          "email",
          "phoneNumber",
        ]);
        setUsers(result);
      } else {
        setUsers(users);
      }
    }
  }, [searchValue, users]);

  const columns: any[] = [
    {
      title: "Photo",
      dataIndex: "photoUrl",
      key: "photoUrl",
      render: (_: string, record: any) => (
        <div className='flex items-center'>
          {record?.photoUrl ? (
            <Avatar
              src={record?.photoUrl}
              size={50}
              style={{ marginRight: 8 }}
            />
          ) : (
            <Avatar
              icon={<UserOutlined />}
              size={50}
              style={{ marginRight: 8 }}
            />
          )}
        </div>
      ),
    },
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_: string, record: any) => (
        <div className='flex items-center'>
          <Avatar icon={<UserOutlined />} size={50} />
          <span className='ml-3 text-lg text-nowrap font-bold'>{`${record.firstName} ${record.lastName}`}</span>
        </div>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "More",
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

  const lableInfos = {
    user: {
      addButtonTitle: "Add new User",
      placeholderText:
        "Search by user information (first name, last name, email & phone number)",
    },
    driver: {
      addButtonTitle: "Add new Driver",
      placeholderText:
        "Search by driver information (first name, last name, email & phone number)",
    },
    rider: {
      addButtonTitle: "Add new Rider",
      placeholderText:
        "Search by rider information (first name, last name, email & phone number)",
    },
  };

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
        placeholderText={lableInfos[role ?? "user"]?.placeholderText}
        onAddButtonClicked={() => {
          setOpenDrawer(true);
        }}
        addButtonTitle={lableInfos[role ?? "user"]?.addButtonTitle}
        showAddButton={role === "user"}
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
          role={
            role ? (role.slice(0, -1) as "user" | "driver" | "rider") : null
          }
        />
      )}
    </>
  );
};

export default List;
