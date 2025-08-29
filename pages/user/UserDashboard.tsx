

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import { MOCK_ORDERS } from '../../constants';
import { DollarSign, ShoppingCart, ListChecks, ArrowRight } from 'lucide-react';
import type { Order } from '../../types';
import { OrderStatus } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { getUserLevel, getLevelDetails, getNextLevel } from '../../utils/levelUtils';

const UserLevelCard: React.FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();

    if (!user) return null;

    const currentLevelKey = getUserLevel(user.spent);
    const currentLevel = getLevelDetails(currentLevelKey);
    const nextLevel = getNextLevel(currentLevelKey);

    let progress = 0;
    let progressText = t('maxLevelReached');
    
    if (nextLevel) {
        const spentInCurrentLevel = user.spent - currentLevel.minSpent;
        const requiredForNextLevel = nextLevel.minSpent - currentLevel.minSpent;
        progress = (spentInCurrentLevel / requiredForNextLevel) * 100;
        const needed = nextLevel.minSpent - user.spent;
        progressText = t('spendXMore', { amount: needed.toFixed(2), level: t(nextLevel.name.toLowerCase()) });
    } else {
        progress = 100;
    }

    const LevelIcon = currentLevel.icon;

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <LevelIcon className={`w-12 h-12 ${currentLevel.color.replace('text-', 'text-white/80')}`} />
                    <div>
                        <p className="text-sm opacity-80">{t('yourCurrentLevel')}</p>
                        <h3 className="text-2xl font-bold">{t(currentLevel.name.toLowerCase())}</h3>
                        <p className="font-semibold text-primary-200">{t('levelDiscount', { discount: currentLevel.discount * 100 })}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/3">
                     <p className="text-xs text-right mb-1 opacity-80">{progressText}</p>
                     <div className="w-full bg-primary-400/50 rounded-full h-2.5">
                        <div className="bg-white rounded-full h-2.5" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
                 <Link to="/levels" className="flex items-center justify-center gap-2 text-sm font-semibold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                    {t('viewAllLevels')} <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </Card>
    );
};


const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.COMPLETED: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case OrderStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case OrderStatus.CANCELED: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

const UserDashboard: React.FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();

    if (!user) return null;

    const userOrders = MOCK_ORDERS.filter(o => o.userId === user.id);
    const recentOrders = userOrders.slice(0, 5);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <UserLevelCard />

                <StatCard 
                    title={t('currentBalance')}
                    value={`$${user.balance.toFixed(2)}`}
                    icon={<DollarSign className="w-6 h-6 text-green-500" />}
                    color="bg-green-100 dark:bg-green-900"
                />
                <StatCard 
                    title={t('totalOrders')}
                    value={userOrders.length.toString()}
                    icon={<ShoppingCart className="w-6 h-6 text-blue-500" />}
                    color="bg-blue-100 dark:bg-blue-900"
                />
                <StatCard 
                    title={t('totalSpent')}
                    value={`$${user.spent.toFixed(2)}`}
                    icon={<ListChecks className="w-6 h-6 text-indigo-500" />}
                    color="bg-indigo-100 dark:bg-indigo-900"
                />
            </div>
            
            <Card title={t('recentOrders')}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t('orderId')}</th>
                                <th scope="col" className="px-6 py-3">{t('service')}</th>
                                <th scope="col" className="px-6 py-3">{t('charge')}</th>
                                <th scope="col" className="px-6 py-3">{t('date')}</th>
                                <th scope="col" className="px-6 py-3">{t('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order: Order) => (
                                <tr key={order.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.id}
                                    </th>
                                    <td className="px-6 py-4">{order.serviceName}</td>
                                    <td className="px-6 py-4">${order.charge.toFixed(2)}</td>
                                    <td className="px-6 py-4">{order.createdAt}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default UserDashboard;