import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Rocket } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from '../../hooks/useTheme';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { t } = useTranslation();
    const { siteName } = useTheme();

    const handleLogin = (e: React.FormEvent, role: 'user' | 'admin') => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            if (!email) {
                setError(t('emailError'));
                setIsSubmitting(false);
                return;
            }
            login(email, role);
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="flex items-center text-3xl font-bold text-primary-600 dark:text-primary-400">
                          <Rocket className="w-10 h-10 mr-2"/>
                          <span>{siteName}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('signInTitle')}</h2>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">{t('emailLabel')}</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder={t('emailPlaceholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password-for-demo" className="sr-only">{t('passwordLabel')}</label>
                            <input
                                id="password-for-demo"
                                name="password-for-demo"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder={t('passwordPlaceholder')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <div className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            onClick={(e) => handleLogin(e, 'user')}
                            isLoading={isSubmitting}
                            className="w-full"
                        >
                            {t('signInUser')}
                        </Button>
                        <Button
                            type="submit"
                            onClick={(e) => handleLogin(e, 'admin')}
                            isLoading={isSubmitting}
                            variant="secondary"
                            className="w-full"
                        >
                            {t('signInAdmin')}
                        </Button>
                    </div>
                     <div className="text-sm text-center">
                        <span className="text-gray-600 dark:text-gray-400">{t('noAccount')} </span>
                        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                            {t('signUp')}
                        </Link>
                    </div>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        {t('demoHint')}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;