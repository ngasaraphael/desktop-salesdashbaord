import axios from 'axios';

export const fetchChartData = async () => {
  const res = await axios.get(
    'https://sales-dashboard-server.herokuapp.com/chart'
  );
  return res.data;
};
