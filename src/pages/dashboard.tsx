import { Icon } from "@iconify/react";
import Rides from "./rides/registerdRideList";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApolloErrorFormatter } from "../graphql/apolloErrorFormatter";
import { useLazyQuery } from "@apollo/client";
import { GET_DASHBOARD_DATA } from "../graphql/queries/dashboard";

type CardsCountType = {
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

export type DashboardTypes = {
  weeklyRideRequests: any;
  monthlyRideRequests: any;
  dailyRideRequests: any[];
  cardsCount: CardsCountType;
};

const Dashboard = () => {
  const [datas, setDatas] = useState<DashboardTypes>();

  const [getDatas] = useLazyQuery(GET_DASHBOARD_DATA, {
    fetchPolicy: "network-only",
    onCompleted: (value: any) => {
      setDatas(value?.getDashboardDatas);
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <>
      <CardsCount data={datas?.cardsCount} />
      <div className='bg-gray-50 p-2 rounded-md'>
        <Rides showHeader={false} limit={3} />
      </div>
    </>
  );
};

export const CardsCount = ({ data }: { data?: CardsCountType }) => {
  return (
    <div className='flex justify-between items-center gap-4 mb-4'>
      <div className='bg-gray-50 border-2 border-gray-100 w-full rounded-md p-4 flex flex-col justify-between gap-2'>
        <p className='text-lg font-semibold text-gray-800 flex justify-between'>
          <span>Drivers</span>
          <span>
            <Icon icon='healthicons:truck-driver' width={40} height={40} />
          </span>
        </p>
        <p className='text-2xl font-extrabold text-gray-900'>
          <span>{data?.drivers?.available ?? 0}</span>/
          <span>{data?.drivers?.total ?? 0}</span>
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
        <p className='text-2xl font-extrabold text-gray-900'>
          <span>{data?.rideRequests?.completed ?? 0}</span>/
          <span>{data?.rideRequests?.canceled ?? 0}</span>
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
        <p className='text-2xl font-extrabold text-gray-900'>
          <span>{data?.weeklyRegistration?.riders ?? 0}</span>/
          <span>{data?.weeklyRegistration?.drivers ?? 0}</span>
        </p>
        <p className='text-lg text-gray-600'>
          New Riders/Drivers added to in the system
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
