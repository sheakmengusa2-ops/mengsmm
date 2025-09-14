
import React, { useEffect } from 'react';
import Card from '../../components/ui/Card';
import { useTranslation } from '../../hooks/useTranslation';
import { MOCK_ANNOUNCEMENTS } from '../../constants';
import type { Announcement } from '../../types';
import { Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AnnouncementsPage: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const announcements = [...MOCK_ANNOUNCEMENTS].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    useEffect(() => {
        if (user) {
            // Mark all announcements as read when the user visits this page
            const allAnnouncementIds = MOCK_ANNOUNCEMENTS.map(a => a.id);
            localStorage.setItem(`read_announcements_user_${user.id}`, JSON.stringify(allAnnouncementIds));
            // You might want to trigger a re-render of the sidebar here if it doesn't happen automatically
            // For this app, location change in sidebar useEffect handles it.
        }
    }, [user]);

    return (
        <Card title={t('announcements')}>
            <div className="space-y-6">
                {announcements.length > 0 ? (
                    announcements.map((announcement: Announcement) => (
                        <div key={announcement.id} className="flex items-start space-x-4 p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300 rounded-full flex items-center justify-center">
                                    <Bell className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{announcement.title}</h3>
                                <p className="text-xs text-gray-500 mb-2">{announcement.createdAt}</p>
                                <p className="text-gray-700 dark:text-gray-300">{announcement.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-12">{t('noAnnouncements')}</p>
                )}
            </div>
        </Card>
    );
};

export default AnnouncementsPage;
