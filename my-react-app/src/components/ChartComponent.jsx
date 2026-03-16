import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ themeColor }) => {
  const [activeChart, setActiveChart] = useState('line');

  const lineData = [
    { name: 'Січ', visitors: 4000, sales: 2400 },
    { name: 'Лют', visitors: 3000, sales: 1398 },
    { name: 'Бер', visitors: 2000, sales: 9800 },
    { name: 'Кві', visitors: 2780, sales: 3908 },
    { name: 'Тра', visitors: 1890, sales: 4800 },
    { name: 'Чер', visitors: 2390, sales: 3800 },
    { name: 'Лип', visitors: 3490, sales: 4300 },
  ];

  const barData = [
    { name: 'Пн', sales: 4000, profit: 2400 },
    { name: 'Вт', sales: 3000, profit: 1398 },
    { name: 'Ср', sales: 2000, profit: 9800 },
    { name: 'Чт', sales: 2780, profit: 3908 },
    { name: 'Пт', sales: 1890, profit: 4800 },
    { name: 'Сб', sales: 2390, profit: 3800 },
    { name: 'Нд', sales: 3490, profit: 4300 },
  ];

  const pieData = [
    { name: 'Desktop', value: 400 },
    { name: 'Mobile', value: 300 },
    { name: 'Tablet', value: 300 },
    { name: 'Other', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderChart = () => {
    switch (activeChart) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Line type="monotone" dataKey="visitors" stroke={themeColor} strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Bar dataKey="sales" fill={themeColor} radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Area type="monotone" dataKey="visitors" stroke={themeColor} fill={`${themeColor}40`} strokeWidth={2} />
              <Area type="monotone" dataKey="sales" stroke="#10b981" fill="#10b98140" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="chart-component">
      <h2>Аналітика та графіки</h2>
      <p className="chart-description">
        Візуалізація даних з використанням бібліотеки Recharts
      </p>

      <div className="chart-tabs">
        {[
          { id: 'line', label: 'Лінійний' },
          { id: 'bar', label: 'Стовпчиковий' },
          { id: 'area', label: 'Область' },
          { id: 'pie', label: 'Круговий' },
        ].map((chart) => (
          <button
            key={chart.id}
            className={`chart-tab ${activeChart === chart.id ? 'active' : ''}`}
            onClick={() => setActiveChart(chart.id)}
          >
            {chart.label}
          </button>
        ))}
      </div>

      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartComponent;
