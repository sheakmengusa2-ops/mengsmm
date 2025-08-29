

import React, { useState, useMemo } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { MOCK_SERVICES, MOCK_ORDERS } from '../../constants';
import type { Service } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from '../../hooks/useTranslation';
import { getUserLevel, getLevelDetails } from '../../utils/levelUtils';
import { OrderStatus } from '../../types';

const NewOrderPage: React.FC = () => {
    const { user, placeNewOrder } = useAuth();
    const { t } = useTranslation();
    
    const [activeTab, setActiveTab] = useState<'single' | 'mass'>('single');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const [isLoading, setIsLoading] = useState(false);

    // Single Order State
    const [category, setCategory] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [link, setLink] = useState('');
    const [quantity, setQuantity] = useState('');
    const [charge, setCharge] = useState(0);
    const [dripFeed, setDripFeed] = useState(false);
    const [runs, setRuns] = useState('2');
    const [interval, setInterval] = useState('30'); // in minutes

    // Mass Order State
    const [massOrderText, setMassOrderText] = useState('');

    const userLevel = useMemo(() => user ? getLevelDetails(getUserLevel(user.spent)) : null, [user]);
    const discount = userLevel ? userLevel.discount : 0;

    const categories = useMemo(() => [...new Set(MOCK_SERVICES.map(s => s.category))], []);
    const services = useMemo(() => MOCK_SERVICES.filter(s => s.category === category), [category]);
    const selectedService = useMemo(() => MOCK_SERVICES.find(s => s.id === parseInt(serviceId)), [serviceId]);

    const calculateCharge = (qty: number, service: Service) => {
        if (isNaN(qty) || qty <= 0) return 0;
        const baseCharge = (qty / 1000) * service.rate;
        return baseCharge - (baseCharge * discount);
    };

    const updateCharge = (newQuantity: string, service: Service) => {
        const numQuantity = Number(newQuantity);
        const totalQuantity = dripFeed ? numQuantity * Number(runs || 1) : numQuantity;
        const newCharge = calculateCharge(totalQuantity, service);
        setCharge(newCharge);
    };

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newServiceId = e.target.value;
        setServiceId(newServiceId);
        const service = MOCK_SERVICES.find(s => s.id === parseInt(newServiceId));
        if (service) {
            const currentQuantity = quantity || String(service.min);
            setQuantity(currentQuantity);
            updateCharge(currentQuantity, service);
        } else {
            setQuantity('');
            setCharge(0);
        }
    };
    
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
        if (selectedService) {
            updateCharge(e.target.value, selectedService);
        }
    };
    
    const handleRunsIntervalChange = () => {
         if (selectedService) {
            updateCharge(quantity, selectedService);
        }
    }
    
    React.useEffect(() => {
        handleRunsIntervalChange();
    }, [runs, interval, dripFeed]);

    const handleSingleOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessageType('error');
        if (!selectedService || !link || !quantity) {
            setMessage(t('fillAllFieldsError'));
            return;
        }
        
        const numQuantity = Number(quantity);
        if (numQuantity < selectedService.min || numQuantity > selectedService.max) {
             setMessage(t('quantityError', { min: selectedService.min, max: selectedService.max }));
            return;
        }

        if (dripFeed && (Number(runs) < 2 || Number(interval) < 1)) {
            setMessage(t('dripFeedError'));
            return;
        }

        if (user && user.balance < charge) {
            setMessage(t('insufficientBalanceError'));
            return;
        }

        setIsLoading(true);
        setMessage('');
        // Simulate API call
        setTimeout(() => {
            placeNewOrder(charge);
            setIsLoading(false);
            setMessageType('success');
            setMessage(t('orderSuccessMsg'));
            
            // This is a hack for demo
            MOCK_ORDERS.unshift({
                id: Math.floor(Math.random() * 9000) + 1000,
                userId: user!.id,
                serviceId: selectedService.id,
                serviceName: selectedService.name,
                link,
                quantity: dripFeed ? Number(quantity) * Number(runs) : Number(quantity),
                charge,
                start_count: 0,
                remains: 0,
                // FIX: Use OrderStatus enum members for type safety instead of string literals.
                status: dripFeed ? OrderStatus.DRIP_FEED : OrderStatus.PENDING,
                createdAt: new Date().toISOString().split('T')[0],
                runs: dripFeed ? Number(runs) : undefined,
                interval: dripFeed ? Number(interval) : undefined,
            });
            
            // Reset form
            setLink('');
            setQuantity('');
            setCharge(0);
        }, 1500);
    };

     const handleMassOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessageType('error');
        if (!massOrderText.trim()) {
            setMessage(t('massOrderEmptyError'));
            return;
        }
        alert(t('massOrderSubmitted'));
        setMassOrderText('');
     };

    const totalQuantity = useMemo(() => {
        if (!dripFeed) return Number(quantity) || 0;
        return (Number(quantity) || 0) * (Number(runs) || 0);
    }, [quantity, runs, dripFeed]);

    const baseCharge = selectedService ? (totalQuantity / 1000) * selectedService.rate : 0;

    return (
        <div className="max-w-2xl mx-auto">
            <Card title={t('createNewOrder')}>
                <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                    <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                        <button onClick={() => setActiveTab('single')} className={`${activeTab === 'single' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>{t('singleOrder')}</button>
                        <button onClick={() => setActiveTab('mass')} className={`${activeTab === 'mass' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>{t('massOrder')}</button>
                    </nav>
                </div>

                {activeTab === 'single' ? (
                    <form onSubmit={handleSingleOrderSubmit} className="space-y-6">
                        {/* Fields for single order */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('category')}</label>
                            <select id="category" value={category} onChange={(e) => { setCategory(e.target.value); setServiceId(''); setCharge(0); }} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                                <option value="">{t('selectCategory')}</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        {category && (
                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('service')}</label>
                                <select id="service" value={serviceId} onChange={handleServiceChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                                    <option value="">{t('selectService')}</option>
                                    {services.map(s => <option key={s.id} value={s.id}>{s.name} - ${s.rate}/1000</option>)}
                                </select>
                            </div>
                        )}
                        {selectedService && (
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <h4 className="font-semibold mb-2">{t('serviceDescription')}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedService.description}</p>
                                <p className="text-sm mt-2">{t('min')}: <span className="font-semibold">{selectedService.min}</span> / {t('max')}: <span className="font-semibold">{selectedService.max}</span></p>
                            </div>
                        )}
                        <div>
                            <label htmlFor="link" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('link')}</label>
                            <input type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-primary-500 focus:border-primary-500" placeholder={t('linkPlaceholder')} />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('quantity')}</label>
                            <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-primary-500 focus:border-primary-500" placeholder={t('quantityPlaceholder')} />
                        </div>

                        <div className="relative flex items-start">
                            <div className="flex items-center h-5">
                                <input id="drip-feed" type="checkbox" checked={dripFeed} onChange={(e) => setDripFeed(e.target.checked)} className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="drip-feed" className="font-medium text-gray-700 dark:text-gray-300">{t('dripFeed')}</label>
                            </div>
                        </div>

                        {dripFeed && (
                             <div className="grid grid-cols-2 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-md">
                                <div>
                                    <label htmlFor="runs" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('runs')}</label>
                                    <input type="number" id="runs" value={runs} onChange={(e) => setRuns(e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" min="2"/>
                                </div>
                                <div>
                                    <label htmlFor="interval" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('intervalMinutes')}</label>
                                    <input type="number" id="interval" value={interval} onChange={(e) => setInterval(e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" min="1"/>
                                </div>
                                <div className="col-span-2 text-center text-xs text-gray-500">
                                    {t('totalQuantity')}: <span className="font-semibold">{totalQuantity}</span>
                                </div>
                            </div>
                        )}

                        <div className="p-4 border-t border-gray-200 dark:border-gray-600 text-center space-y-1">
                             {discount > 0 && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t('originalPrice')}: <span className="line-through">${baseCharge.toFixed(4)}</span>
                                    <span className={`ml-2 font-semibold ${userLevel?.color}`}>{t('levelDiscount', { discount: discount * 100 })}</span>
                                </p>
                            )}
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">{t('totalCharge')}: <span className="text-primary-600 dark:text-primary-400">${charge.toFixed(4)}</span></p>
                        </div>
                        {message && <p className={`text-sm text-center ${messageType === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message}</p>}
                        <Button type="submit" isLoading={isLoading} className="w-full">
                            {t('placeOrder')}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleMassOrderSubmit} className="space-y-6">
                       <div>
                            <label htmlFor="mass-order" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('massOrderFormat')}</label>
                            <textarea
                                id="mass-order"
                                rows={10}
                                value={massOrderText}
                                onChange={(e) => setMassOrderText(e.target.value)}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md font-mono"
                                placeholder={`service_id|link|quantity
service_id|link|quantity
...`}
                            />
                        </div>
                        {message && <p className={`text-sm text-center ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                        <Button type="submit" isLoading={isLoading} className="w-full">
                            {t('placeOrder')}
                        </Button>
                    </form>
                )}
            </Card>
        </div>
    );
};

export default NewOrderPage;