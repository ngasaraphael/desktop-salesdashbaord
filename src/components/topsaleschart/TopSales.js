import React from 'react';
import './topsales.modules.css';
import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const TopSales = () => {
  const data = [
    { name: 'tv', value: 6 },
    { name: 'iphone', value: 10 },
    { name: 'macbook', value: 12 },
  ];

  return (
    <div className='salesChart'>
      <h5 className='barChartTitle'>Top Sales</h5>
      <div height={160} width={280}>
        <BarChart width={280} height={160} data={data}>
          <XAxis dataKey='name' />
          <YAxis dataKey='value' />
          <Tooltip />
          <Bar dataKey='value' fill='#7a9fff' />
        </BarChart>
      </div>
    </div>
  );
};

export default TopSales;
