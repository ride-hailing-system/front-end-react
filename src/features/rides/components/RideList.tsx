import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Table } from '../../../components/Table';
import { Drawer } from '../../../components/Drawer';
import { GET_RIDES } from '../../../graphql/queries/ride';
import { useNavigate } from 'react-router-dom';
import { DELETE_RIDE } from '../../../graphql/mutations/ride';
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from '../../../store/context/confirmationModalContext';
import { ArraySearch } from '../../../utils/arraySearch';
import { useRide } from '../hooks/useRide';
import { useGraphQLMutation, useGraphQLQuery } from '../../../hooks/useGraphQL';
import RideDetail from './RideDetail';

export type RidesTableType = {
  showHeader?: boolean;
  limit?: number;
};

const RideList = ({ showHeader = true, limit = 10 }: RidesTableType) => {
  const navigate = useNavigate();
  const { getTableColumns } = useRide();
  const [rides, setRides] = useState<any[]>([]);
  const [ridesCopy, setRidesCopy] = useState<any[]>([]);
  const [selectedRides, setSelectedRides] = useState<any>(null);
  const [searchValue, setSearchValue] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [rowLimits, setRowLimits] = useState<number>(limit);

  const { runQuery: getRides, loading } = useGraphQLQuery({
    queryStr: GET_RIDES,
    onSuccess: (data: any) => {
      setRides(data?.getAllRides || []);
      setRidesCopy(data?.getAllRides || []);
    },
  });

  const { runMutation: deleteRequest, loading: deleting } = useGraphQLMutation({
    mutationStr: DELETE_RIDE,
    onSuccess: () => {
      toast.success('request deleted successfully');
    },
  });

  useEffect(() => {
    getRides({
      variables: {
        limit: limit,
      },
    });
  }, []);

  useEffect(() => {
    if (ridesCopy.length > 0) {
      if (searchValue) {
        const result = ArraySearch({ searchValue }, rides, [
          'riderInfo.firstName',
          'riderInfo.lastName',
          'driverInfo.firstName',
          'driverInfo.lastName',
          'status',
          'requestNumber',
          'requestedAt',
        ]);

        setRides(result);
      } else {
        setRides(ridesCopy);
      }
    }
  }, [searchValue, ridesCopy]);

  const handleDelete = async (id: string) => {
    try {
      await deleteRequest({
        variables: {
          _id: id,
        },
      });
    } catch (error: any) {
      toast.error(
        error.message || 'An error occurred while deleting the request'
      );
    }
  };

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext
  );

  return (
    <>
      <Table
        data={rides}
        columns={getTableColumns({
          onEdit: (record: any) => console.log(record),
          onDelete: (record: any) => {
            setcmProps((prev: ConfirmationModalPropsType) => ({
              ...prev,
              content: 'Are you sure want to delete this request ?',
              okButtonText: 'Yes, delete',
              onOk: async () => {
                handleDelete(record?._id);
              },
              show: true,
            }));
          },
          onViewDetail(record) {
            setSelectedRides(record);
            setOpenDrawer(true);
          },
        })}
        rowKey="id"
        loading={loading || deleting}
        onSearchInputChange={(value: string) => {
          setSearchValue(value);
        }}
        placeholderText={
          'Search by name, status, request number or requested at.'
        }
        showAddButton={true}
        addButtonTitle="Start new Ride"
        onAddButtonClicked={() => {
          navigate('/admin/rides/registration-form');
        }}
        showHeaderBar={showHeader}
      />

      {openDrawer && (
        <Drawer
          title={'View complete ride information'}
          open
          onClose={() => {
            setOpenDrawer(false);
          }}
          width={600}
          footer={<div />}
        >
          <RideDetail data={selectedRides} />
        </Drawer>
      )}
    </>
  );
};

export default RideList;
