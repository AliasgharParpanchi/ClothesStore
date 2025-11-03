import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components'
import Info from '../components/featuredinfo';
import Chart from '../components/Chart';
import WidgetSm from '../components/WidgetSm';
import WidgetLg from '../components/WidgetLg';
import {adminRequest} from './../requestMethods';

const Container = styled.div`
          direction: rtl;
          flex: 4;
`
const HomeWidgets = styled.div`
          display: flex;
          margin: 20px;
`

export default function Home() {

  const [userStats, setUserStats] = useState([])
  const MONTHS = useMemo(
    () => [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند"
    ],
    []
  );


  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await adminRequest.get("admin/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);


  return (
    <Container>
      <Info/>
      <Chart data={userStats} title="آنالیز کاربران" grid dataKey="Active User"/>
      <HomeWidgets>
        <WidgetSm />
        <WidgetLg />
      </HomeWidgets>
    </Container>
  )
}
