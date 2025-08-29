
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_TICKETS, MOCK_TICKET_MESSAGES, MOCK_USERS } from '../../constants';
import { TicketStatus } from '../../types';
import { ArrowLeft } from 'lucide-react';

const TicketDetailPage: React.FC = () => {
    const { ticketId } = useParams<{ ticketId: string }>();
    const { user } = useAuth();
    const { t } = useTranslation();
    
    const [replyMessage, setReplyMessage] = useState('');

    const ticket = useMemo(() => MOCK_TICKETS.find(t => t.id === Number(ticketId)), [ticketId]);
    const messages = useMemo(() => MOCK_TICKET_MESSAGES.filter(m => m.ticketId === Number(ticketId)).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()), [ticketId]);

    if (!ticket || !user) {
        return <p>Ticket not found.</p>;
    }
    
    // Security check: regular user can only see their own tickets
    if (user.role === 'user' && ticket.userId !== user.id) {
         return <p>Access denied.</p>;
    }

    const ticketUser = MOCK_USERS.find(u => u.id === ticket.userId);

    const handleReply = (e: React.FormEvent) => {
        e.preventDefault();
        if(!replyMessage.trim()) return;
        
        console.log("New Reply:", {
            ticketId: ticket.id,
            message: replyMessage,
            sender: user.role
        });
        
        alert("Reply submitted (demo)!");
        setReplyMessage('');
    };

    const getStatusColor = (status: TicketStatus) => {
        switch (status) {
            case TicketStatus.OPEN: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case TicketStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case TicketStatus.CLOSED: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };
    
    const translatedStatus = ticket.status === TicketStatus.OPEN ? t('statusOpen') : ticket.status === TicketStatus.IN_PROGRESS ? t('statusInProgress') : t('statusClosed');

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-4">
                <Link to="/support-tickets" className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('supportTickets')}
                </Link>
            </div>
            <Card>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold">{ticket.subject}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Ticket #{ticket.id} | Created by: {ticketUser?.username} on {ticket.createdAt}
                            </p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                            {translatedStatus}
                        </span>
                    </div>
                </div>

                <div className="p-6 space-y-4 h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
                    {messages.map(message => (
                        <div key={message.id} className={`flex items-start gap-3 ${message.isFromAdmin ? 'justify-end' : 'justify-start'}`}>
                            {!message.isFromAdmin && <img src={`https://i.pravatar.cc/150?u=${ticketUser?.email}`} alt="user" className="w-8 h-8 rounded-full" />}
                            <div className={`max-w-md p-3 rounded-lg ${message.isFromAdmin ? 'bg-primary-500 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 rounded-bl-none'}`}>
                                <p className="text-sm">{message.message}</p>
                                <p className="text-xs opacity-70 mt-1 text-right">{message.createdAt}</p>
                            </div>
                            {message.isFromAdmin && <img src={`https://i.pravatar.cc/150?u=admin@demo.com`} alt="admin" className="w-8 h-8 rounded-full" />}
                        </div>
                    ))}
                </div>

                {ticket.status !== TicketStatus.CLOSED && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleReply} className="space-y-4">
                            <div>
                                <label htmlFor="reply" className="text-sm font-medium text-gray-700 dark:text-gray-300 sr-only">{t('yourReply')}</label>
                                <textarea
                                    id="reply"
                                    rows={4}
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    className="block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                                    placeholder={t('messagePlaceholder')}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">{t('sendMessage')}</Button>
                            </div>
                        </form>
                    </div>
                )}
                 {user.role === 'admin' && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-end space-x-2">
                        <span className="text-sm font-medium">Change Status:</span>
                        <Button size="sm" variant={ticket.status === TicketStatus.OPEN ? "primary" : "secondary"}>Open</Button>
                        <Button size="sm" variant={ticket.status === TicketStatus.IN_PROGRESS ? "primary" : "secondary"}>In Progress</Button>
                        <Button size="sm" variant={ticket.status === TicketStatus.CLOSED ? "primary" : "secondary"}>Close</Button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default TicketDetailPage;
