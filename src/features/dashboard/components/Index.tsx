import Rides from '../../rides/components/RideList';
import { useEffect, useState } from 'react';
import { GET_DASHBOARD_DATA } from '../../../graphql/queries/dashboard';
import { DashboardCards, type CardsCountType } from './DashboardCards';
import { useGraphQLQuery } from '../../../hooks/useGraphQL';

export type DashboardTypes = {
  weeklyRideRequests: any;
  monthlyRideRequests: any;
  dailyRideRequests: any[];
  cardsCount: CardsCountType;
};

const Index = () => {
  const [datas, setDatas] = useState<DashboardTypes>();

  const { runQuery: getDatas, loading } = useGraphQLQuery({
    queryStr: GET_DASHBOARD_DATA,
    onSuccess: (data: any) => {
      setDatas(data?.getDashboardDatas);
    },
  });

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <>
      <DashboardCards data={datas?.cardsCount} loading={loading} />
      <div className="bg-gray-50 p-2 rounded-md">
        <Rides showHeader={false} limit={3} />
      </div>
    </>
  );
};

export default Index;
