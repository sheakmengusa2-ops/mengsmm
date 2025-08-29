import React from 'react';
import StatCard from '../../components/ui/StatCard';
import { Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';
import { MOCK_USERS, MOCK_ORDERS, MOCK_SERVICES } from '../../constants';
import RevenueChart from '../../components/charts/RevenueChart';
import Card from '../../components/ui/Card';
import { useTranslation } from '../../hooks/useTranslation';

const AdminDashboard: React.FC = () => {
    const { t } = useTranslation();
    const totalUsers = MOCK_USERS.length;
    const totalOrders = MOCK_ORDERS.length;
    const totalRevenue = MOCK_ORDERS.reduce((sum, order) => sum + order.charge, 0);
    const totalServices = MOCK_SERVICES.length;

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard 
                    title={t('totalRevenue')}
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={<DollarSign className="w-6 h-6 text-green-500" />}
                    color="bg-green-100 dark:bg-green-900"
                />
                <StatCard 
                    title={t('totalUsers')}
                    value={totalUsers.toString()}
                    icon={<Users className="w-6 h-6 text-blue-500" />}
                    color="bg-blue-100 dark:bg-blue-900"
                />
                <StatCard 
                    title={t('totalOrders')}
                    value={totalOrders.toString()}
                    icon={<ShoppingCart className="w-6 h-6 text-indigo-500" />}
                    color="bg-indigo-100 dark:bg-indigo-900"
                />
                <StatCard 
                    title={t('totalServices')}
                    value={totalServices.toString()}
                    icon={<Activity className="w-6 h-6 text-yellow-500" />}
                    color="bg-yellow-100 dark:bg-yellow-900"
                />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                <RevenueChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                 <Card title={t('recentOrders')}>
                    <p>Order list would be here...</p>
                 </Card>
                 <Card title={t('recentUsers')}>
                    <p>New user list would be here...</p>
                 </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;