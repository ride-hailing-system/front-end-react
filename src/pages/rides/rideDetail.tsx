import { Descriptions } from "antd";
import dayjs from "dayjs";
import UserProfile from "../../components/userProfile";
import RideStatus from "../../components/rideStatus";

const RideDetail = ({ data }: { data: any }) => {
  const pickup = data.pickupLocation.coordinates;
  const dropoff = data.dropoffLocation.coordinates;

  return (
    <Descriptions bordered column={1} size='middle'>
      <Descriptions.Item label='Request #'>
        <span className='font-bold uppercase'>{data.requestNumber}</span>
      </Descriptions.Item>
      <Descriptions.Item label='Driver Info'>
        {data.driverInfo ? (
          <UserProfile
            firstName={data.driverInfo?.firstName}
            lastName={data.driverInfo?.lastName}
            photoUrl={data.driverInfo?.photoUrl}
            link={`/admin/driver-detail/${data.driverInfo?._id}`}
            avatarSize={30}
          />
        ) : (
          <p className='flex items-center justify-center font-light border-solid border-gray-300 rounded-lg p-2'>
            <span className='text-red-500'>No driver assigned</span>
          </p>
        )}
      </Descriptions.Item>
      <Descriptions.Item label='Customer Info'>
        <UserProfile
          firstName={
            data.riderInfo ? data.riderInfo?.firstName : data?.fullName
          }
          lastName={data.riderInfo ? data.riderInfo?.lastName : ""}
          photoUrl={data.riderInfo ? data.riderInfo?.photoUrl : undefined}
          avatarSize={30}
        />
      </Descriptions.Item>
      <Descriptions.Item label='From where (start point)'>
        {pickup.description} ({pickup.latitude}, {pickup.longitude})
      </Descriptions.Item>
      <Descriptions.Item label='To where (destination)'>
        {dropoff.description} ({dropoff.latitude}, {dropoff.longitude})
      </Descriptions.Item>
      <Descriptions.Item label='Estimated fee'>${data.fare}</Descriptions.Item>
      <Descriptions.Item label='Status'>
        <RideStatus status={data.status} />
      </Descriptions.Item>
      <Descriptions.Item label='Requested At'>
        {dayjs(data.requestedAt).format("YYYY-MM-DD HH:mm")}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default RideDetail;
