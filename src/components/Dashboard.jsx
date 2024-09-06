import { useState, useEffect } from 'react';
import axios from 'axios';
import TimeWindowSelector from './TimeWindowSelector';
import { generatedData } from '../services/Data';
import Card from './Card';
import PieChart from './PieChart';
import BarChart from './BarChart';


const Dashboard = () => {
  const [data, setData] = useState(generatedData);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedWindow, setSelectedWindow] = useState('1d');

  ///
   
  ///

  // Fetch all data from the API
//   console.log("100",generatedData)
//   console.log("str",Data.stats)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/stats');
//         // setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

  // Update filtered data whenever selectedWindow or data changes
  useEffect(() => {
    filterData();
  }, [selectedWindow, data]);

  const filterData = () => {
    const now = new Date();
    let filtered;

    if (selectedWindow === '1d') {
      filtered = data.filter((stat) => {
        const statDate = new Date(stat.date);
        const oneDayAgo = new Date(now);
        oneDayAgo.setDate(now.getDate() - 1);
        return statDate >= oneDayAgo;
      });
    } else if (selectedWindow === '1w') {
      filtered = data.filter((stat) => {
        const statDate = new Date(stat.date);
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return statDate >= oneWeekAgo;
      });
    } else if (selectedWindow === '1m') {
      filtered = data.filter((stat) => {
        const statDate = new Date(stat.date);
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return statDate >= oneMonthAgo;
      });
    }

    setFilteredData(filtered);
  };

  const handleTimeWindowChange = (newWindow) => {
    setSelectedWindow(newWindow);
  };
// console.log("ty",data[0].pieChartData.values[0])
// console.log("r",filteredData)
const totalSales = filteredData.reduce((acc, stat) => acc + parseFloat(stat.totalSales), 0);
const totalUsers = filteredData.reduce((acc, stat) => acc + parseFloat(stat.totalUsers), 0);
let sal=0;
let user=0;
// console.log(totalSales,totalUsers)
const totalRevenue = filteredData.reduce((acc, stat) => acc + parseFloat(stat.revenue.replace('$', '')), 0);
const pieChartData = filteredData.length > 0 ? filteredData[0].pieChartData : data[0].pieChartData;
const BarchartData = filteredData.length > 0 ? filteredData[0].barChartData : data[0].barChartData;

const count = filteredData.length;

// Compute average for pie chart
// const averageData = count > 0
//   ? {
//       labels: ['Product A', 'Product B', 'Product C'],
//       values: [
//         pieChartData.values[0] / count, 
//         pieChartData.values[1] / count, 
//         pieChartData.values[2] / count
//       ]
//     }
//   : data[0].pieChartData;

  const pieChartDataa = {
    labels: [],
    values: []
  };
  const barchartDataa = {
    labels: [],
    values: []
  };

if (filteredData.length > 0) {
    const categoryMap = {};

    // Assuming each data entry has a 'category' and 'sales' field
    filteredData.forEach(stat => {
        for(let i=0;i<stat.pieChartData.labels.length;i++){
            const category = stat.pieChartData.labels[i];
            if (categoryMap[category]) {
              categoryMap[category] += stat.pieChartData.values[i];
            } else {
              categoryMap[category] = stat.pieChartData.values[i];
            }

        }
    });
   
    pieChartDataa.labels = Object.keys(categoryMap);
    // console.log("first",categoryMap)
    pieChartDataa.values = (Object.values(categoryMap));
  }
if (filteredData.length > 0) {
    const categoryMap = {};

    // Assuming each data entry has a 'category' and 'sales' field
    filteredData.forEach(stat => {
        for(let i=0;i<stat.barChartData.labels.length;i++){
            const category = stat.barChartData.labels[i];
            if (categoryMap[category]) {
              categoryMap[category] += stat.barChartData.values[i];
            } else {
              categoryMap[category] = stat.barChartData.values[i];
            }

        }
    });
   
    barchartDataa.labels = Object.keys(categoryMap);
    // console.log("first",categoryMap)
    barchartDataa.values = (Object.values(categoryMap));
  }
//   console.log("f",pieChartDataa)
//   console.log("m",barchartDataa)
//   console.log("fi",pieChartDataa.values)
  

  return (
    <div className="p-4">
      <TimeWindowSelector onTimeWindowChange={handleTimeWindowChange} />
      <div className="grid grid-cols-3 gap-4">
        {/* {filteredData.map((stat) => ( */}
          <div  className="p-4 border rounded shadow">
            <h3>Total Sales: {count ? totalSales : data[0].totalSales}</h3>
            <h4>Total Users: {count ? totalUsers :data[0].totalUsers}</h4>
            <h4>Revenue: {count ? totalRevenue :data[0].revenue}</h4>
            {/* Render pie chart or other stats components here */}
          </div>
        {/* ))} */}
      </div>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-6">
        <Card title="Total Sales" value={totalSales ===0 ? data[0].totalSales : totalSales} />
        <Card title="Total Users" value={totalUsers ===0 ? data[0].totalUsers : totalUsers} />
        <Card title="Revenue" value={totalRevenue ===0 ? data[0].revenue: totalRevenue} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2 sm:grid-cols-1">
        <PieChart data={count ? pieChartDataa :data[0].pieChartData} />
        <BarChart data={count ? barchartDataa :data[0].barChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
