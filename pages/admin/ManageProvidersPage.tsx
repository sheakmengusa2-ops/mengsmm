import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { MOCK_PROVIDERS } from '../../constants';
import type { ServiceProvider } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { PlusCircle, Edit, Trash, Eye, EyeOff } from 'lucide-react';

const ApiKeyDisplay: React.FC<{ apiKey: string }> = ({ apiKey }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="flex items-center space-x-2">
            <span className="font-mono text-sm">
                {isVisible ? apiKey : '•'.repeat(12)}
            </span>
            <button onClick={() => setIsVisible(!isVisible)} className="focus:outline-none">
                {isVisible ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
            </button>
        </div>
    );
};

const ManageProvidersPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Card title={t('manageProviders')} actions={
            <Button size="sm">
                <PlusCircle className="w-4 h-4 mr-2" />
                {t('addProvider')}
            </Button>
        }>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">{t('providerName')}</th>
                            <th scope="col" className="px-6 py-3">{t('apiUrl')}</th>
                            <th scope="col" className="px-6 py-3">{t('apiKey')}</th>
                            <th scope="col" className="px-6 py-3">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_PROVIDERS.map((provider: ServiceProvider) => (
                            <tr key={provider.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{provider.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{provider.name}</td>
                                <td className="px-6 py-4">{provider.apiUrl}</td>
                                <td className="px-6 py-4">
                                   <ApiKeyDisplay apiKey={provider.apiKey} />
                                </td>
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

export default ManageProvidersPage;
