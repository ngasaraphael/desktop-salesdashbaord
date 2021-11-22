import React, { useState, useEffect } from 'react';
import Widget from '../../components/widgets/Widget';
import './home.modules.css';
import { Table } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from 'recharts';
import { fetchChartData } from '../../actions/Actions';

const Home = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // chart data
    getChartData();
  }, []);

  const getChartData = async () => {
    //from action component
    const res = await fetchChartData();
    setChartData(res);
  };

  const handleEdit = (i) => {
    let currentRow = chartData[i];
    localStorage.setItem('monthprofit', JSON.stringify(currentRow));
    window.open('/editprofit', '_self');
  };

  const renderChatData = () => {
    return chartData.map((data, i) => (
      <tr key={i}>
        <th scope='row'>{i}</th>
        <td>{data.month}</td>
        <td>{data.costprice}</td>
        <td>{data.salesprice}</td>
        <td>{data.profit}</td>
        <td>
          <button
            onClick={() => {
              handleEdit(i);
            }}
            to='/'
            className='editItemIcon'
          >
            <i className='fas fa-edit'></i>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className='home'>
      <Widget />
      {/* Chart */}
      <div className='chart'>
        <h3 className='chartTitle'>Monthly Pofits Chart ($)</h3>
        <ResponsiveContainer width='100%' aspect={5 / 2}>
          <LineChart data={chartData}>
            <XAxis dataKey='month' stroke='#5550bd' />
            <YAxis dataKey='profit' stroke='#5550bd' />
            <Line type='monotone' dataKey='profit' stroke='#5550bd' />
            <Tooltip />
            <CartesianGrid stroke='#edeff2' />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* table */}
      <div className='salesTable'>
        <h3 className='salesTableTitle'>Monthly Profits Table</h3>

        <Table className='table-striped'>
          <thead className='tableHead'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Month</th>
              <th scope='col'>Costprice</th>
              <th scope='col'>Salesprice</th>
              <th scope='col'>Profit ($)</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>{renderChatData()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
