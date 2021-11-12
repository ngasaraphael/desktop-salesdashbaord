import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './widget.modules.css';

import CountUp from 'react-countup';
import TopSales from '../topsaleschart/TopSales';

const Widget = () => {
  const [costPrice, setCostPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');

  useEffect(() => {
    // card and monthly data
    async function getData() {
      const res = await axios.get(
        'https://salesdashboard-server.herokuapp.com/item/get'
      );

      console.log(res.data);

      const items = res.data;
      if (items.length === 0) {
        return null;
      }
      let sumOfCostprice = items
        .map((item) => item.costprice)
        .reduce((a, b) => {
          return a + b;
        });
      setCostPrice(sumOfCostprice);

      let sumOfSellingprice = items
        .map((item) => item.sellingprice)
        .reduce((a, b) => {
          return a + b;
        });
      setSalePrice(sumOfSellingprice);
    }
    getData();
  }, []);

  return (
    <div className='salesWidget'>
      <h3 className='salesTitle'>Sales summary of the month</h3>
      <div className='widgets'>
        <div className='widget'>
          <h5 className='widgetTitle'>Total cost price</h5>
          <h4 className='costPrice'>
            <CountUp
              start={0}
              end={costPrice}
              duration={4}
              prefix='USD '
              separator=','
            ></CountUp>
          </h4>
          <small>
            This Month <i className='fas fa-arrow-up'></i>
          </small>
        </div>
        <div className='widget'>
          <h5 className='widgetTitle'>Total sales price</h5>
          <h4 className='costPrice'>
            <CountUp
              start={0}
              end={salePrice}
              duration={4}
              prefix='USD '
              separator=','
            ></CountUp>
          </h4>
          <small>
            This Month <i className='fas fa-arrow-up'></i>
          </small>
        </div>
        <div className='widget'>
          <h5 className='widgetTitle'>Profit</h5>
          <h4 className='costPrice'>
            <CountUp
              start={0}
              end={salePrice - costPrice}
              duration={4}
              prefix='USD '
              separator=','
            ></CountUp>
          </h4>
          <small>
            This Month <i className='fas fa-arrow-up'></i>
          </small>
        </div>
        <div className='widget'>
          <TopSales />
        </div>
      </div>
    </div>
  );
};

export default Widget;
