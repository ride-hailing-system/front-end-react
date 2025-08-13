import { Form } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { ApolloErrorFormatter } from '../../../graphql/apolloErrorFormatter';
import toast from 'react-hot-toast';
import { Table } from '../../../components/Table';
import { GET_USERS } from '../../../graphql/queries/user';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Select } from '../../../components/Select';
import { UPDATE_USER } from '../../../graphql/mutations/user';
import { UserSuspensionForm } from './UserSuspensionForm';
import { useUser } from '../hooks/useUser';
import UserRegistrationForm from './UserRegistrationForm';
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from '../../../store/context/confirmationModalContext';
import { ArraySearch } from '../../../utils/arraySearch';
import { useGraphQLMutation, useGraphQLQuery } from '../../../hooks/useGraphQL';

const UserList = () => {
  const { getTableColumns, lableInfos } = useUser();

  const [users, setUsers] = useState<any[]>([]);
  const [usersCopy, setUsersCopy] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchValue, setSearchValue] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [status, setStatus] = useState('none-deleted');
  const [isSuspendFormVisible, setIsSuspendFormVisible] = useState(false);

  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const role: 'user' | 'driver' | 'rider' | null =
    (searchParams.get('role') as 'user' | 'driver' | 'rider') || null;

  const { runQuery: getUsers, loading } = useGraphQLQuery({
    queryStr: GET_USERS,
    onSuccess: (data: any) => {
      setUsers(data?.getAllUsers || []);
      setUsersCopy(data?.getAllUsers || []);
    },
  });

  const { runMutation: updateUser, loading: updating } = useGraphQLMutation({
    mutationStr: UPDATE_USER,
    onSuccess: () => {
      toast.success('User restored successfully');
      getUsers({
        variables: {
          role,
          status,
        },
      });
    },
  });

  useEffect(() => {
    if (role) {
      getUsers({
        variables: {
          role,
          status,
        },
      });
    }
  }, [role, status]);

  useEffect(() => {
    if (usersCopy.length > 0) {
      if (searchValue) {
        const result = ArraySearch({ searchValue }, users, [
          'firstName',
          'lastName',
          'email',
          'phoneNumber',
        ]);
        setUsers(result);
      } else {
        setUsers(usersCopy);
      }
    }
  }, [searchValue, usersCopy]);

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext
  );

  useEffect(() => {
    setcmProps((prev: ConfirmationModalPropsType) => ({
      ...prev,
      onCancel: () => {},
    }));
  }, []);

  const handleRestoreAccount = async (id: string) => {
    try {
      updateUser({
        variables: {
          _id: id,
          status: 'active',
        },
      });
    } catch (error: any) {
      toast.error(ApolloErrorFormatter(error, true).toString());
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await updateUser({
        variables: {
          _id: id,
          status: 'deleted',
        },
      });
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while updating the user');
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Table
        data={users}
        columns={getTableColumns({
          onEdit: (record: any) => {
            setSelectedUser(record);
            setOpenDrawer(true);
          },
          onSuspend: (record: any) => {
            setSelectedUser(record);
            setIsSuspendFormVisible(true);
          },
          onDelete: (record: any) => {
            setcmProps((prev: ConfirmationModalPropsType) => ({
              ...prev,
              content: 'Are you sure want to delete this user ?',
              okButtonText: 'Yes, delete',
              onOk: async () => {
                handleDelete(record?._id);
              },
              show: true,
            }));
          },
          onViewDetail: (record: any) => {
            navigate(`/admin/driver-detail/${record?._id}`);
          },
          onRestoreAccount: (record: any) => {
            setcmProps((prev: ConfirmationModalPropsType) => ({
              ...prev,
              content: 'Are you sure want to restore this account ?',
              okButtonText: 'Yes, restore',
              onOk: async () => {
                handleRestoreAccount(record?._id);
              },
              show: true,
            }));
          },
        })}
        rowKey="_id"
        loading={loading || updating}
        onSearchInputChange={(value: string) => {
          setSearchValue(value);
        }}
        placeholderText={lableInfos[role ?? 'user']?.placeholderText}
        onAddButtonClicked={() => {
          setOpenDrawer(true);
        }}
        addButtonTitle={lableInfos[role ?? 'user']?.addButtonTitle}
        showAddButton={role === 'user'}
        FilterOption={
          <Select
            data={[
              {
                text: 'Deleted users',
                value: 'deleted',
              },
              {
                text: 'Active users',
                value: 'none-deleted',
              },
            ]}
            placeholderText="Apply user filter"
            onChange={(value: any) => {
              setStatus(value);
            }}
            classNames="shadow-none focus:shadow-none outline-none bg-transparent"
          />
        }
      />
      <UserSuspensionForm
        record={selectedUser}
        open={isSuspendFormVisible}
        onClose={() => {
          setIsSuspendFormVisible(false);
        }}
      />
      {openDrawer && (
        <UserRegistrationForm
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

export default UserList;
