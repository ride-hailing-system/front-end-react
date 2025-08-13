import { useEffect, useState } from 'react';
import { Table } from '../../../components/Table';
import { GET_VEHICLES } from '../../../graphql/queries/vehicle';
import { Drawer } from '../../../components/Drawer';
import { useVehicle } from '../hook/useVehicle';
import { ArraySearch } from '../../../utils/arraySearch';
import { useGraphQLQuery } from '../../../hooks/useGraphQL';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [vehiclesCopy, setVehiclesCopy] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [searchValue, setSearchValue] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);

  const { getTableColumns } = useVehicle();

  const { runQuery: getVehicles, loading } = useGraphQLQuery({
    queryStr: GET_VEHICLES,
    onSuccess: (data: any) => {
      setVehicles(data?.getAllVehicles || []);
      setVehiclesCopy(data?.getAllVehicles || []);
    },
  });

  useEffect(() => {
    getVehicles();
  }, []);

  useEffect(() => {
    if (vehiclesCopy.length > 0) {
      if (searchValue) {
        const result = ArraySearch({ searchValue }, vehicles, [
          'vehicleType',
          'plateNumber',
          'vehicleModel',
          'size',
          'color',
        ]);
        setVehicles(result);
      } else {
        setVehicles(vehiclesCopy);
      }
    }
  }, [searchValue, vehiclesCopy]);

  return (
    <>
      <Table
        data={vehicles}
        columns={getTableColumns({
          onEdit: (record: any) => {
            setSelectedVehicle(record);
            setOpenDrawer(true);
          },
        })}
        rowKey="id"
        loading={loading}
        onSearchInputChange={(value: string) => {
          setSearchValue(value);
        }}
        placeholderText={
          'Search by vehicle information (type, plate#, model, size & color)'
        }
        showAddButton={false}
        addButtonTitle="Add new vehicle"
        onAddButtonClicked={() => {
          setOpenDrawer(true);
        }}
      />

      {openDrawer && (
        <Drawer
          title={'Vehicle detail view'}
          open
          onClose={() => {
            setOpenDrawer(false);
          }}
        >
          <p>{JSON.stringify(selectedVehicle)}</p>
        </Drawer>
      )}
    </>
  );
};

export default VehicleList;
