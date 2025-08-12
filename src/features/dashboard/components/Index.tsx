import Rides from "../../rides/components/RideList";
import { useEffect, useState } from "react";
import { GET_DASHBOARD_DATA } from "../../../graphql/queries/dashboard";
import { DashboardCards, type CardsCountType } from "./DashboardCards";
import { useGraphQL } from "../../../hooks/useGraphQL";

export type DashboardTypes = {
  weeklyRideRequests: any;
  monthlyRideRequests: any;
  dailyRideRequests: any[];
  cardsCount: CardsCountType;
};

const Index = () => {
  const [datas, setDatas] = useState<DashboardTypes>();

  const { query } = useGraphQL();

  const { runQuery: getDatas, loading } = query({
    queryStr: GET_DASHBOARD_DATA,
    onSuccess: (data) => {
      setDatas(data?.getDashboardDatas);
    },
  });

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <>
      <DashboardCards data={datas?.cardsCount} loading={loading} />
      <div className='bg-gray-50 p-2 rounded-md'>
        <Rides showHeader={false} limit={3} />
      </div>
    </>
  );
};

export default Index;
