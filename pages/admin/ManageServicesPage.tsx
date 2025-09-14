import React, { useMemo } from 'react';
import Card from '../../components/ui/Card';
import { MOCK_SERVICES, MOCK_PROVIDERS } from '../../constants';
import type { Service } from '../../types';
import Button from '../../components/ui/Button';
import { Edit, Trash, PlusCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const ManageServicesPage: React.FC = () => {
    const { t } = useTranslation();

    const servicesWithProvider = useMemo(() => {
        return MOCK_SERVICES.map(service => {
            const provider = MOCK_PROVIDERS.find(p => p.id === service.providerId);
            const profit = service.rate - service.cost;
            const profitMargin = service.cost > 0 ? (profit / service.cost) * 100 : 0;
            return {
                ...service,
                providerName: provider ? provider.name : t('manual'),
                profit,
                profitMargin
            };
        });
    }, [t]);

    return (
        <Card title={t('manageServices')} actions={<Button size="sm"><PlusCircle className="w-4 h-4 mr-2" />{t('addService')}</Button>}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('serviceId')}</th>
                            <th scope="col" className="px-6 py-3">{t('name')}</th>
                            <th scope="col" className="px-6 py-3">{t('provider')}</th>
                            <th scope="col" className="px-6 py-3">{t('cost')}</th>
                            <th scope="col" className="px-6 py-3">{t('rate')}</th>
                            <th scope="col" className="px-6 py-3">{t('profitMargin')}</th>
                            <th scope="col" className="px-6 py-3">{t('minMax')}</th>
                            <th scope="col" className="px-6 py-3">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicesWithProvider.map((service) => (
                            <tr key={service.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{service.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{service.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${service.providerId ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                      {service.providerName}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-red-600 dark:text-red-400 font-mono">${service.cost.toFixed(4)}</td>
                                <td className="px-6 py-4 text-green-600 dark:text-green-400 font-mono">${service.rate.toFixed(4)}</td>
                                <td className="px-6 py-4">
                                     <span className={`font-semibold ${service.profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {service.profitMargin.toFixed(2)}%
                                    </span>
                                </td>
                                <td className="px-6 py-4">{service.min} / {service.max}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <Button size="sm" variant="secondary"><Edit className="w-4 h-4" /></Button>
                                    <Button size="sm" variant="danger"><Trash className="w-4 h-4" /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default ManageServicesPage;