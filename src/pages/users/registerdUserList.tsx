import { Form } from "antd";
import { useEffect, useState } from "react";
import { ApolloErrorFormatter } from "../../graphql/apolloErrorFormatter";
import { useLazyQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { LocalSearch } from "../../utils/localSearch";
import { Table } from "../../components/table";
import { GET_USERS } from "../../graphql/queries/user";
import RegisterNewUserForm from "./registerNewUserForm";
import { useSearchParams } from "react-router-dom";
import UserProfile from "../../components/userProfile";
import { Icon } from "@iconify/react/dist/iconify.js";

import { ActionMenus } from "./actionMenus";

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
      setUsers(value?.getAllUsers || []);
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
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (_: string, record: any) => (
        <UserProfile
          firstName={record?.firstName}
          lastName={record?.lastName}
          photoUrl={record?.photoUrl}
        />
      ),
    },
    {
      title: "Phone #",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_: string, record: any) => (
        <div className='flex items-center gap-2'>
          <Icon
            icon='mdi:phone'
            width={25}
            height={25}
            className='text-gray-700'
          />
          <span className='text-sm'>{record?.phoneNumber}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: string, record: any) => (
        <div className='flex items-center gap-2'>
          <Icon
            icon='mdi:email'
            width={25}
            height={25}
            className='text-gray-700'
          />
          <span className='text-sm'>{record?.email}</span>
        </div>
      ),
    },
    {
      title: "More",
      key: "more",
      render: (record: any) => (
        <>
          <ActionMenus
            record={record}
            onEdit={() => {
              setSelectedUser(record);
              setOpenDrawer(true);
            }}
          />
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
        rowKey='_id'
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
        <RegisterNewUserForm
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
          role={role}
        />
      )}
    </>
  );
};

export default List;
