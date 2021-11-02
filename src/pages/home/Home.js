import React, { useState, useEffect } from 'react';
import Widget from '../../components/widgets/Widget';
import './home.modules.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from 'recharts';

const Home = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // chart data
    const fetchChartData = async () => {
      const res = await axios.get(
        'https://sales-dashboard-server.herokuapp.com/chart'
      );
      const chartData = res.data;
      setChartData(chartData);
    };

    fetchChartData();
  }, ['']);

  return (
    <div className='home'>
      <Widget />
      {/* Chart */}
      <div className='chart'>
        <h3 className='chartTitle'>Monthly Pofits Chart ($)</h3>
        <ResponsiveContainer width='100%' aspect={4 / 1}>
          <LineChart data={chartData}>
            <XAxis dataKey='Month' stroke='#5550bd' />
            <YAxis dataKey='Profit' stroke='#5550bd' />
            <Line type='monotone' dataKey='Profit' stroke='#5550bd' />
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
          <tbody>
            {chartData.map((data, i) => (
              <tr key={i}>
                <th scope='row'>{i}</th>
                <td>{data.Month}</td>
                <td>{data.Costprice}</td>
                <td>{data.Salesprice}</td>
                <td>{data.Profit}</td>
                <td>
                  <Link to='/' className='editItemIcon'>
                    <i className='fas fa-edit'></i>
                  </Link>
                  <button className='deleteBtn'>
                    <i className='far fa-trash-alt'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
