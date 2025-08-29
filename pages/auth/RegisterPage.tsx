
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Rocket } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setError(t('fillAllFieldsError'));
            return;
        }
        setError('');
        setIsSubmitting(true);

        try {
            const searchParams = new URLSearchParams(location.search);
            const refId = searchParams.get('ref');
            const referrerId = refId ? parseInt(refId, 10) : undefined;

            await register(username, email, referrerId);
            // On successful registration, AuthContext will set the user and App.tsx will redirect.
            // No need to call navigate('/') here as the context change handles it.
        } catch (err: any) {
            setError(err.message || t('registrationError'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        alert(`${provider} login is not implemented in this demo.`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center text-3xl font-bold text-primary-600 dark:text-primary-400">
                            <Rocket className="w-10 h-10 mr-2" />
                            <span>MENGSMM</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('createAccountTitle')}</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="rounded-md shadow-sm space-y-4">
                         <div>
                            <label htmlFor="username" className="sr-only">{t('username')}</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                placeholder={t('usernamePlaceholder')}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">{t('emailLabel')}</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                placeholder={t('emailPlaceholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">{t('passwordLabel')}</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                placeholder={t('passwordPlaceholder')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <div>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            className="w-full"
                        >
                            {t('signUp')}
                        </Button>
                    </div>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">{t('orContinueWith')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button type="button" variant="secondary" onClick={() => handleSocialLogin('Google')}>
                           <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 62.3l-66.5 64.6C305.5 102.6 279.3 96 248 96c-88.8 0-160.1 71.9-160.1 160.1s71.3 160.1 160.1 160.1c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Google
                        </Button>
                        <Button type="button" variant="secondary" onClick={() => handleSocialLogin('Facebook')}>
                            <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
                            Facebook
                        </Button>
                    </div>
                     <div className="text-sm text-center">
                        <span className="text-gray-600 dark:text-gray-400">{t('alreadyHaveAccount')} </span>
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            {t('login')}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
