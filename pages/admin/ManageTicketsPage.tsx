
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { MOCK_TICKETS } from '../../constants';
import type { Ticket } from '../../types';
import { TicketStatus } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';

const getStatusColor = (status: TicketStatus) => {
    switch (status) {
        case TicketStatus.OPEN: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case TicketStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case TicketStatus.CLOSED: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

const ManageTicketsPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState<'all' | TicketStatus>('all');

    const filteredTickets = useMemo(() => {
        if (statusFilter === 'all') {
            return MOCK_TICKETS;
        }
        return MOCK_TICKETS.filter(ticket => ticket.status === statusFilter);
    }, [statusFilter]);
    
    return (
        <Card title={t('allTickets')}>
             <div className="mb-4 flex justify-end">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | TicketStatus)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                >
                    <option value="all">{t('allStatuses')}</option>
                    <option value={TicketStatus.OPEN}>{t('statusOpen')}</option>
                    <option value={TicketStatus.IN_PROGRESS}>{t('statusInProgress')}</option>
                    <option value={TicketStatus.CLOSED}>{t('statusClosed')}</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('ticketId')}</th>
                            <th scope="col" className="px-6 py-3">{t('username')}</th>
                            <th scope="col" className="px-6 py-3">{t('subject')}</th>
                            <th scope="col" className="px-6 py-3">{t('lastUpdated')}</th>
                            <th scope="col" className="px-6 py-3">{t('status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.map((ticket: Ticket) => (
                            <tr key={ticket.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => navigate(`/support-tickets/${ticket.id}`)}>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{ticket.id}</td>
                                <td className="px-6 py-4">{ticket.username}</td>
                                <td className="px-6 py-4">{ticket.subject}</td>
                                <td className="px-6 py-4">{ticket.lastUpdated}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                                        {ticket.status === TicketStatus.OPEN ? t('statusOpen') : ticket.status === TicketStatus.IN_PROGRESS ? t('statusInProgress') : t('statusClosed')}
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

export default ManageTicketsPage;
