import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

const GaugeChart = ({ value }) => {
    // Ensuring that value is not undefined and is a number
    const validValue = isNaN(value) ? 0 : value;

    const data = [
        { name: 'Value', value: validValue },
        { name: 'Rest', value: 100 - validValue }
    ];

    const COLORS = ['#FF8042', '#DDD']; // Color for the filled part and the transparent part

    return (
        <ResponsiveContainer width="100%" height={250}> {/* Setting a fixed height for the container */}
        
            <PieChart>
                <Pie
                    data={[{ name: 'Background', value: 100 }]} // Simplified background data assignment
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#ccc" // Neutral color for the background
                    isAnimationActive={false}
                />
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
                    paddingAngle={5}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    
                </Pie>
 
            </PieChart>
        </ResponsiveContainer>
    );
};

export default GaugeChart;
