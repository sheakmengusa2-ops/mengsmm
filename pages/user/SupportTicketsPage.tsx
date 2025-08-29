
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { MOCK_TICKETS } from '../../constants';
import type { Ticket } from '../../types';
import { TicketStatus } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { PlusCircle } from 'lucide-react';

const CreateTicketModal: React.FC<{ onClose: () => void; onSubmit: (subject: string, message: string) => void }> = ({ onClose, onSubmit }) => {
    const { t } = useTranslation();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(subject.trim() && message.trim()) {
            onSubmit(subject, message);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full">
                <h3 className="text-xl font-bold mb-4">{t('createNewTicket')}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('subject')}</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                            placeholder={t('subjectPlaceholder')}
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('message')}</label>
                        <textarea
                            id="message"
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                            placeholder={t('messagePlaceholder')}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose}>{t('cancel')}</Button>
                        <Button type="submit">{t('submitTicket')}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}


const SupportTicketsPage: React.FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const userTickets = useMemo(() => {
        if (!user) return [];
        return MOCK_TICKETS.filter(t => t.userId === user.id);
    }, [user]);

    const getStatusColor = (status: TicketStatus) => {
        switch (status) {
            case TicketStatus.OPEN: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case TicketStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case TicketStatus.CLOSED: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };
    
    const handleCreateTicket = (subject: string, message: string) => {
        console.log("Creating new ticket:", { subject, message });
        // In a real app, you would make an API call here.
        alert(t('ticketCreatedSuccess'));
        setIsModalOpen(false);
    };

    return (
        <>
            {isModalOpen && <CreateTicketModal onClose={() => setIsModalOpen(false)} onSubmit={handleCreateTicket} />}
            <Card title={t('supportTickets')} actions={<Button size="sm" onClick={() => setIsModalOpen(true)}><PlusCircle className="w-4 h-4 mr-2" />{t('createNewTicket')}</Button>}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t('ticketId')}</th>
                                <th scope="col" className="px-6 py-3">{t('subject')}</th>
                                <th scope="col" className="px-6 py-3">{t('lastUpdated')}</th>
                                <th scope="col" className="px-6 py-3">{t('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTickets.map((ticket: Ticket) => (
                                <tr key={ticket.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => navigate(`/support-tickets/${ticket.id}`)}>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{ticket.id}</td>
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
        </>
    );
};

export default SupportTicketsPage;
