import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { getYoutubeVideoId } from '../../utils/youtubeUtils';
import { useTheme } from '../../hooks/useTheme';

const SettingsPage: React.FC = () => {
    const { t } = useTranslation();
    const { siteName, setSiteName } = useTheme();
    const [inputSiteName, setInputSiteName] = useState(siteName);
    const [videoUrl, setVideoUrl] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const [isLoading, setIsLoading] = useState(false);
    
    const DEFAULT_VIDEO_URL = 'https://www.youtube.com/watch?v=FRYfyREIf30';

    useEffect(() => {
        const videoId = localStorage.getItem('landingPageVideoId');
        if (videoId) {
            setVideoUrl(`https://www.youtube.com/watch?v=${videoId}`);
        } else {
            setVideoUrl(DEFAULT_VIDEO_URL);
        }
    }, []);

    useEffect(() => {
        setInputSiteName(siteName);
    }, [siteName]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        // Save site name
        setSiteName(inputSiteName);

        const videoId = getYoutubeVideoId(videoUrl);

        setTimeout(() => {
            if (videoId) {
                localStorage.setItem('landingPageVideoId', videoId);
                setMessageType('success');
                setMessage(t('settingsSavedSuccess'));
            } else {
                setMessageType('error');
                setMessage(t('invalidYoutubeUrl'));
            }
            setIsLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }, 500);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card title={t('siteSettings')}>
                <form onSubmit={handleSave}>
                    <div className="space-y-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                             <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">{t('generalSettings')}</h3>
                             <div className="mt-4">
                                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('siteName')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="siteName"
                                        id="siteName"
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                                        placeholder={t('siteNamePlaceholder')}
                                        value={inputSiteName}
                                        onChange={(e) => setInputSiteName(e.target.value)}
                                    />
                                </div>
                             </div>
                        </div>
                         <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                             <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">{t('landingPageSettings')}</h3>
                             <div className="mt-4">
                                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('youtubeVideoUrl')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="videoUrl"
                                        id="videoUrl"
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                                        placeholder={t('youtubeVideoUrlPlaceholder')}
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                    />
                                </div>
                             </div>
                        </div>

                         {message && (
                            <p className={`text-sm text-center ${messageType === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {message}
                            </p>
                        )}

                        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button type="submit" isLoading={isLoading}>
                                {t('saveSettings')}
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default SettingsPage;