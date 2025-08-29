
import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className={`p-3 rounded-full ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
