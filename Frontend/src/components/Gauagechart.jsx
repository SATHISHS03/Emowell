import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

const GaugeChart = ({ value }) => {
    // Ensuring that value is not undefined and is a number
    const validValue = isNaN(value) ? 0 : value;

    const data = [
        { name: 'Value', value: validValue },
        { name: 'Rest', value: 100 - validValue }
    ];

    // Improved color scheme
    const COLORS = ['#0088FE', '#DDD']; // Bright blue for the value, light gray for the rest

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                {/* Background pie to show full circle */}
                <Pie
                    data={[{ name: 'Background', value: 100 }]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#eee"  // Soft gray for a more subtle background
                    isAnimationActive={false}
                />
                {/* Foreground pie to show actual value */}
                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#8884d8"
                    paddingAngle={0}
                    isAnimationActive={true}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                {/* Central Text displaying the value */}
                <Text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="progress-label"
                    style={{ fontSize: '1.5em', fill: '#333' }}
                >
                    {`${validValue}%`}
                </Text>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default GaugeChart;
