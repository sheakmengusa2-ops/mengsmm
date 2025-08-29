
import React from 'react';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from '../../hooks/useTranslation';
import { USER_LEVELS } from '../../constants';
import { getUserLevel } from '../../utils/levelUtils';
import type { UserLevelKey } from '../../types';
import { CheckCircle } from 'lucide-react';

const UserLevelsPage: React.FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();

    const currentUserLevel = user ? getUserLevel(user.spent) : 'BRONZE';

    return (
        <Card title={t('userLevels')}>
            <div className="space-y-6">
                {(Object.keys(USER_LEVELS) as UserLevelKey[]).map((levelKey) => {
                    const level = USER_LEVELS[levelKey];
                    const isCurrentUserLevel = levelKey === currentUserLevel;
                    const Icon = level.icon;

                    return (
                        <div key={level.name} className={`p-6 rounded-lg border-2 ${isCurrentUserLevel ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'bg-white dark:bg-gray-800'}`}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Icon className={`w-12 h-12 ${level.color}`} />
                                    <div>
                                        <h3 className={`text-2xl font-bold ${level.color}`}>{t(level.name.toLowerCase())}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium">{t('benefits')}</p>
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:text-right">
                                    <p className="font-semibold">{t('requirement')}</p>
                                    <p className="text-gray-500 dark:text-gray-400">{t('totalSpentRequirement', { amount: level.minSpent })}</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        <span className="font-semibold">{t('levelDiscount', { discount: level.discount * 100 })}</span>
                                    </li>
                                    {/* Add more benefits here in the future */}
                                </ul>
                            </div>
                            {isCurrentUserLevel && (
                                <div className="mt-4 text-center text-sm font-semibold bg-primary-100 dark:bg-primary-500/30 text-primary-700 dark:text-primary-300 py-2 rounded-md">
                                    {t('yourLevel')}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default UserLevelsPage;
