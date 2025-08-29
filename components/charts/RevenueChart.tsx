import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import { useTranslation } from '../../hooks/useTranslation';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
  { name: 'Jul', revenue: 7000 },
];

const RevenueChart: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Card title={t('revenueOverview')}>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid #ccc',
                            borderRadius: '0.5rem'
                        }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </Card>
  );
};

export default RevenueChart;