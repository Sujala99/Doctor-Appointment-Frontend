import React from "react";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

function GenderPieChart({ data }) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const chartData = data.map(item => ({
        name: item._id,
        value: item.count
    }));

    return (
        <PieChart width={400} height={400}>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
}
export default GenderPieChart;





