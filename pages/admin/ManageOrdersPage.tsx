import React from 'react';
import Card from '../../components/ui/Card';
import { MOCK_ORDERS } from '../../constants';
import type { Order } from '../../types';
import { OrderStatus } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.COMPLETED: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case OrderStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case OrderStatus.CANCELED: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

const ManageOrdersPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Card title={t('allOrders')}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('orderId')}</th>
                            <th scope="col" className="px-6 py-3">{t('userId')}</th>
                            <th scope="col" className="px-6 py-3">{t('service')}</th>
                            <th scope="col" className="px-6 py-3">{t('link')}</th>
                            <th scope="col" className="px-6 py-3">{t('quantity')}</th>
                            <th scope="col" className="px-6 py-3">{t('charge')}</th>
                            <th scope="col" className="px-6 py-3">{t('date')}</th>
                            <th scope="col" className="px-6 py-3">{t('status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_ORDERS.map((order: Order) => (
                            <tr key={order.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                                <td className="px-6 py-4">{order.userId}</td>
                                <td className="px-6 py-4">{order.serviceName}</td>
                                <td className="px-6 py-4 truncate max-w-xs">{order.link}</td>
                                <td className="px-6 py-4">{order.quantity}</td>
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
    );
};

export default ManageOrdersPage;