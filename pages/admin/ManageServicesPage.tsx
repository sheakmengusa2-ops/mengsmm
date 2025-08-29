import React from 'react';
import Card from '../../components/ui/Card';
import { MOCK_SERVICES } from '../../constants';
import type { Service } from '../../types';
import Button from '../../components/ui/Button';
import { Edit, Trash, PlusCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const ManageServicesPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Card title={t('manageServices')} actions={<Button size="sm"><PlusCircle className="w-4 h-4 mr-2" />{t('addService')}</Button>}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('serviceId')}</th>
                            <th scope="col" className="px-6 py-3">{t('name')}</th>
                            <th scope="col" className="px-6 py-3">{t('category')}</th>
                            <th scope="col" className="px-6 py-3">{t('ratePer1000')}</th>
                            <th scope="col" className="px-6 py-3">{t('minMax')}</th>
                            <th scope="col" className="px-6 py-3">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_SERVICES.map((service: Service) => (
                            <tr key={service.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{service.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{service.name}</td>
                                <td className="px-6 py-4">{service.category}</td>
                                <td className="px-6 py-4">${service.rate.toFixed(2)}</td>
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