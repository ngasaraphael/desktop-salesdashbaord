import axios from 'axios';

export const fetchChartData = async () => {
  const res = await axios.get(
    'https://salesdashboard-server.herokuapp.com/chart'
  );
  return res.data;
};
