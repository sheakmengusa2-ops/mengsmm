import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Home } from 'lucide-react';
import { MOCK_SERVICES } from '../../constants';
import type { Service } from '../../types';
import Card from '../../components/ui/Card';
import { useTranslation } from '../../hooks/useTranslation';

const ServicesPage: React.FC = () => {
    const { t } = useTranslation();

    const groupedServices = MOCK_SERVICES.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
    }, {} as Record<string, Service[]>);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
            <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
                <nav className="container mx-auto flex items-center justify-between p-4 lg:px-8">
                    <Link to="/" className="flex items-center text-2xl font-bold text-primary-600 dark:text-primary-400">
                        <Rocket className="w-8 h-8 mr-2" />
                        <span>MENGSMM</span>
                    </Link>
                    <div className="flex items-center space-x-4">
                         <Link to="/" className="flex items-center text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 hover:text-primary-600">
                            <Home className="w-4 h-4 mr-1" /> {t('backToHome')}
                        </Link>
                        <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                            {t('login')}
                        </Link>
                         <Link to="/register" className="rounded-md bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500">
                           {t('signUp')}
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-12 px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        {t('ourServices')}
                    </h1>
                     <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        {t('elevatePresenceDesc')}
                    </p>
                </div>

                <div className="space-y-8">
                    {Object.entries(groupedServices).map(([category, services]) => (
                        <Card key={category} title={category}>
                             <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">{t('serviceId')}</th>
                                            <th scope="col" className="px-6 py-3">{t('name')}</th>
                                            <th scope="col" className="px-6 py-3 text-center">{t('ratePer1000')}</th>
                                            <th scope="col" className="px-6 py-3 text-center">{t('minMax')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map((service) => (
                                            <tr key={service.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4">{service.id}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {service.name}
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-normal mt-1">{service.description}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center font-mono text-primary-600 dark:text-primary-400">${service.rate.toFixed(2)}</td>
                                                <td className="px-6 py-4 text-center font-mono">{service.min} / {service.max}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
            
            <footer className="bg-gray-800 text-white mt-12">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <p className="text-center text-xs leading-5 text-gray-400">
                    &copy; 2023 MENGSMM. {t('footerRights')}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ServicesPage;