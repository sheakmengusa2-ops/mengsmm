
import React, { useState, useMemo } from 'react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_TRANSACTIONS } from '../../constants';
import { TransactionType } from '../../types';
import { Users, DollarSign, Percent, Copy, Check } from 'lucide-react';

const AffiliatesPage: React.FC = () => {
    const { user, users } = useAuth();
    const { t } = useTranslation();
    const [isCopied, setIsCopied] = useState(false);

    const commissionRate = 5; // 5%

    const referralLink = `${window.location.origin}${window.location.pathname}#/register?ref=${user?.id}`;

    const referredUsers = useMemo(() => {
        if (!user) return [];
        return users.filter(u => u.referrerId === user.id);
    }, [user, users]);

    const commissionHistory = useMemo(() => {
        if (!user) return [];
        return MOCK_TRANSACTIONS.filter(tx => tx.userId === user.id && tx.type === TransactionType.COMMISSION);
    }, [user]);

    const totalEarnings = commissionHistory.reduce((sum, tx) => sum + tx.amount, 0);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (!user) return null;

    return (
        <div className="space-y-6">
            <Card title={t('affiliateProgram')}>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('affiliateDesc', { rate: commissionRate })}
                </p>
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    <input 
                        type="text"
                        readOnly
                        value={referralLink}
                        className="flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none"
                    />
                    <Button onClick={handleCopy} className="w-full sm:w-auto">
                        {isCopied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
                        {isCopied ? t('copied') : t('copyLink')}
                    </Button>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title={t('totalReferrals')}
                    value={referredUsers.length.toString()}
                    icon={<Users className="w-6 h-6 text-blue-500" />}
                    color="bg-blue-100 dark:bg-blue-900"
                />
                <StatCard 
                    title={t('totalEarnings')}
                    value={`$${totalEarnings.toFixed(2)}`}
                    icon={<DollarSign className="w-6 h-6 text-green-500" />}
                    color="bg-green-100 dark:bg-green-900"
                />
                <StatCard 
                    title={t('commissionRate')}
                    value={`${commissionRate}%`}
                    icon={<Percent className="w-6 h-6 text-indigo-500" />}
                    color="bg-indigo-100 dark:bg-indigo-900"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title={t('referredUsers')}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t('username')}</th>
                                    <th scope="col" className="px-6 py-3">{t('dateOfRegistration')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referredUsers.map(refUser => (
                                    <tr key={refUser.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{refUser.username}</td>
                                        <td className="px-6 py-4">{new Date(refUser.registrationDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {referredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={2} className="text-center py-6 text-gray-500">{t('noReferralsYet')}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
                <Card title={t('commissionHistory')}>
                    <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t('date')}</th>
                                    <th scope="col" className="px-6 py-3">{t('description')}</th>
                                    <th scope="col" className="px-6 py-3 text-right">{t('amount')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commissionHistory.map(tx => (
                                    <tr key={tx.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td className="px-6 py-4">{tx.createdAt}</td>
                                        <td className="px-6 py-4">{tx.description}</td>
                                        <td className="px-6 py-4 text-right font-semibold text-green-500">
                                            +${tx.amount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                {commissionHistory.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-6 text-gray-500">{t('noCommissionsYet')}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AffiliatesPage;
