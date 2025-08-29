import React, { useState, useMemo } from 'react';
import Card from '../../components/ui/Card';
import { MOCK_USERS } from '../../constants';
import type { User } from '../../types';
import Button from '../../components/ui/Button';
import { Edit, Ban, PlusCircle, Download, Search } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const ManageUsersPage: React.FC = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');
    const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');

    const filteredUsers = useMemo(() => {
        return MOCK_USERS.filter(user => {
            const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            return matchesSearch && matchesStatus && matchesRole;
        });
    }, [searchTerm, statusFilter, roleFilter]);

    const handleExportCSV = () => {
        const headers: (keyof User)[] = ['id', 'username', 'email', 'role', 'balance', 'spent', 'registrationDate', 'lastLogin', 'status'];
        const csvHeader = headers.join(',') + '\n';
        
        const csvRows = filteredUsers.map(user => 
            headers.map(header => {
                const value = user[header];
                if (typeof value === 'string' && value.includes(',')) {
                    return `"${value}"`;
                }
                return value;
            }).join(',')
        ).join('\n');
        
        const csvContent = csvHeader + csvRows;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'mengsmm_users.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Card 
            title={t('manageUsers')} 
            actions={
                <div className="flex space-x-2">
                    <Button size="sm" variant="secondary" onClick={handleExportCSV}>
                        <Download className="w-4 h-4 mr-2" />
                        {t('exportUsers')}
                    </Button>
                    <Button size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        {t('addUser')}
                    </Button>
                </div>
            }
        >
            <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder={t('searchUsers')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'blocked')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                >
                    <option value="all">{t('allStatuses')}</option>
                    <option value="active">{t('active')}</option>
                    <option value="blocked">{t('blocked')}</option>
                </select>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as 'all' | 'admin' | 'user')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                >
                    <option value="all">{t('allRoles')}</option>
                    <option value="admin">{t('admin')}</option>
                    <option value="user">{t('user')}</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('userId')}</th>
                            <th scope="col" className="px-6 py-3">{t('username')}</th>
                            <th scope="col" className="px-6 py-3">{t('email')}</th>
                            <th scope="col" className="px-6 py-3">{t('balance')}</th>
                            <th scope="col" className="px-6 py-3">{t('spent')}</th>
                            <th scope="col" className="px-6 py-3">{t('dateOfRegistration')}</th>
                            <th scope="col" className="px-6 py-3">{t('lastLogin')}</th>
                            <th scope="col" className="px-6 py-3">{t('status')}</th>
                            <th scope="col" className="px-6 py-3">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user: User) => (
                                <tr key={user.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">{user.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.username}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">${user.balance.toFixed(2)}</td>
                                    <td className="px-6 py-4">${user.spent.toFixed(2)}</td>
                                    <td className="px-6 py-4">{user.registrationDate}</td>
                                    <td className="px-6 py-4">{user.lastLogin}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                            {user.status === 'active' ? t('active') : t('blocked')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <Button size="sm" variant="secondary"><Edit className="w-4 h-4" /></Button>
                                        <Button size="sm" variant="danger"><Ban className="w-4 h-4" /></Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    {t('noUsersFound')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default ManageUsersPage;