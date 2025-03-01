import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function UserBarChart({ data }) {
    const chartData = data.map(item => ({
        month: `Month ${item._id}`,
        users: item.count
    }));

    return (
        <BarChart width={600} height={300} data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
        </BarChart>
    );
}
export default UserBarChart;





