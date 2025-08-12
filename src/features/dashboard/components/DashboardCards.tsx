import { Icon } from "@iconify/react/dist/iconify.js";

export type CardsCountType = {
  drivers: {
    total: number;
    available: number;
  };
  rideRequests: {
    completed: number;
    canceled: number;
  };
  weeklyRegistration: {
    drivers: number;
    riders: number;
  };
};

export const DashboardCards = ({
  data,
  loading,
}: {
  data?: CardsCountType;
  loading: boolean;
}) => {
  return (
    <div className='flex justify-between items-center gap-4 mb-4'>
      <div className='bg-gray-50 border-2 border-gray-100 w-full rounded-md p-4 flex flex-col justify-between gap-2'>
        <p className='text-lg font-semibold text-gray-800 flex justify-between'>
          <span>Drivers</span>
          <span>
            <Icon icon='healthicons:truck-driver' width={40} height={40} />
          </span>
        </p>
        <p className='text-2xl font-semibold text-gray-900'>
          {loading ? (
            <span>loading ...</span>
          ) : (
            <>
              <span>{data?.drivers?.available ?? 0}</span>/
              <span>{data?.drivers?.total ?? 0}</span>
            </>
          )}
        </p>
        <p className='text-lg text-gray-600'>
          Active/Total drivers in the system
        </p>
      </div>
      <div className='bg-gray-50 border-2 border-gray-100 w-full rounded-md p-4 flex flex-col justify-between gap-2'>
        <p className='text-lg font-semibold text-gray-800 flex justify-between'>
          <span>Ride requests</span>
          <span>
            <Icon icon='icon-park-solid:transaction' width={40} height={40} />
          </span>
        </p>
        <p className='text-2xl font-semibold text-gray-900'>
          {loading ? (
            <span>loading ...</span>
          ) : (
            <>
              <span>{data?.rideRequests?.completed ?? 0}</span>/
              <span>{data?.rideRequests?.canceled ?? 0}</span>
            </>
          )}
        </p>
        <p className='text-lg text-gray-600'>
          Total Completed/Canceled requests in the system
        </p>
      </div>
      <div className='bg-gray-50 border-2 border-gray-100 w-full rounded-md p-4 flex flex-col justify-between gap-2'>
        <p className='text-lg font-semibold text-gray-800 flex justify-between'>
          <span>Weekly users registration</span>
          <span>
            <Icon icon='raphael:users' width={40} height={40} />
          </span>
        </p>
        <p className='text-2xl font-semibold text-gray-900'>
          {loading ? (
            <span>loading ...</span>
          ) : (
            <>
              <span>{data?.weeklyRegistration?.riders ?? 0}</span>/
              <span>{data?.weeklyRegistration?.drivers ?? 0}</span>
            </>
          )}
        </p>
        <p className='text-lg text-gray-600'>
          New Riders/Drivers added to in the system
        </p>
      </div>
    </div>
  );
};
