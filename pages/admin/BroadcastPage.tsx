
import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_ANNOUNCEMENTS } from '../../constants';
import type { Announcement } from '../../types';
import { Trash, Send } from 'lucide-react';

const BroadcastPage: React.FC = () => {
    const { t } = useTranslation();
    const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSendBroadcast = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const newAnnouncement: Announcement = {
                id: Date.now(),
                title,
                content,
                createdAt: new Date().toISOString().split('T')[0],
            };

            // In a real app, you'd send this to a server.
            // Here, we prepend it to our mock data array.
            MOCK_ANNOUNCEMENTS.unshift(newAnnouncement); 

            setAnnouncements([newAnnouncement, ...announcements]);
            setTitle('');
            setContent('');
            setIsLoading(false);
            setMessage(t('broadcastSent'));
            setTimeout(() => setMessage(''), 3000);
        }, 1000);
    };
    
    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            // In a real app, make an API call.
            const updatedAnnouncements = announcements.filter(a => a.id !== id);
            const mockIndex = MOCK_ANNOUNCEMENTS.findIndex(a => a.id === id);
            if (mockIndex > -1) {
                MOCK_ANNOUNCEMENTS.splice(mockIndex, 1);
            }
            setAnnouncements(updatedAnnouncements);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <Card title={t('newAnnouncement')}>
                    <form onSubmit={handleSendBroadcast} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('title')}
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                                placeholder={t('titlePlaceholder')}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('content')}
                            </label>
                            <textarea
                                id="content"
                                rows={8}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                                placeholder={t('contentPlaceholder')}
                                required
                            />
                        </div>
                        {message && <p className="text-sm text-green-600">{message}</p>}
                        <Button type="submit" isLoading={isLoading} className="w-full">
                           <Send className="w-4 h-4 mr-2" /> {t('sendBroadcast')}
                        </Button>
                    </form>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card title={t('pastAnnouncements')}>
                    <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
                        {announcements.length > 0 ? (
                            announcements.map(announcement => (
                                <div key={announcement.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">{announcement.title}</h4>
                                            <p className="text-xs text-gray-500">{announcement.createdAt}</p>
                                        </div>
                                        <Button size="sm" variant="danger" onClick={() => handleDelete(announcement.id)}>
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{announcement.content}</p>
                                </div>
                            ))
                        ) : (
                             <p className="text-center text-gray-500 py-8">{t('noAnnouncements')}</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default BroadcastPage;
