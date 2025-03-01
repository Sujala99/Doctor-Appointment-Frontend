import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../../components/sidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function Admin() {
  const [usersPerMonth, setUsersPerMonth] = useState([]);
  const [genderDistribution, setGenderDistribution] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/dashboard/users-per-month', { withCredentials: true })
      .then(res => setUsersPerMonth(res.data))
      .catch(err => console.log(err));

    axios.get('http://localhost:4000/dashboard/gender-distribution', { withCredentials: true })
      .then(res => setGenderDistribution(res.data))
      .catch(err => console.log(err));
  }, []);

  const barChartData = usersPerMonth.map(item => ({
    month: `Month ${item._id}`,
    users: item.count
  }));

  const pieChartData = genderDistribution.map(item => ({
    name: item._id,
    value: item.count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard - User Statistics</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Bar Chart */}
          <div className="w-full sm:w-1/2">
            <h3>Users Registered Per Month</h3>
            <BarChart width={500} height={300} data={barChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </div>

          {/* Pie Chart */}
          <div className="w-full sm:w-1/2">
            <h3>Gender Distribution</h3>
            <PieChart width={300} height={300}>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}

export default Admin;
