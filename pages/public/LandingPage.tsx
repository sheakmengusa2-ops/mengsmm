import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ShieldCheck, Users, Zap, Globe, Paintbrush, Sun, Moon, Check } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from '../../hooks/useTheme';
import { THEMES } from '../../constants/themes';

const LandingPage: React.FC = () => {
  const { t, setLocale, locale } = useTranslation();
  const { theme, setTheme, mode, setMode } = useTheme();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);


  const handleSetLocale = (newLocale: 'en' | 'km') => {
    setLocale(newLocale);
    setIsLangMenuOpen(false);
  };

  const features = [
    {
      name: t('feature1'),
      description: t('feature1Desc'),
      icon: Zap,
    },
    {
      name: t('feature2'),
      description: t('feature2Desc'),
      icon: ShieldCheck,
    },
    {
      name: t('feature3'),
      description: t('feature3Desc'),
      icon: Users,
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center text-2xl font-bold text-primary-600">
              <Rocket className="w-8 h-8 mr-2" />
              <span>MENGSMM</span>
            </a>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end items-center space-x-2 sm:space-x-4">
             <div className="relative">
                <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <Paintbrush className="w-6 h-6 text-gray-900 dark:text-gray-300" />
                </button>
                {isThemeMenuOpen && (
                     <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10 border dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">{t('selectTheme')}</h4>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {THEMES.map((themeOption) => (
                                <button 
                                    key={themeOption.name}
                                    onClick={() => setTheme(themeOption.name)}
                                    className={`w-full h-10 rounded-md flex items-center justify-center border-2 transition-all ${theme === themeOption.name ? 'border-primary-500 ring-2 ring-primary-500/50' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
                                    style={{ backgroundColor: `rgb(${themeOption.colors['--color-primary-500']})`}}
                                    aria-label={t(themeOption.name)}
                                >
                                    {theme === themeOption.name && <Check className="w-5 h-5 text-white" />}
                                </button>
                            ))}
                        </div>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setMode('light')}
                                className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${mode === 'light' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                            >
                                <Sun className="w-4 h-4" />
                                <span>{t('light')}</span>
                            </button>
                              <button
                                onClick={() => setMode('dark')}
                                className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${mode === 'dark' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                            >
                                <Moon className="w-4 h-4" />
                                <span>{t('dark')}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
             <div className="relative">
                <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <Globe className="w-6 h-6 text-gray-900 dark:text-gray-300" />
                </button>
                {isLangMenuOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleSetLocale('en'); }}
                            className={`block px-4 py-2 text-sm ${locale === 'en' ? 'font-bold text-primary-600' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                            English
                        </a>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleSetLocale('km'); }}
                            className={`block px-4 py-2 text-sm ${locale === 'km' ? 'font-bold text-primary-600' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                            ភាសាខ្មែរ
                        </a>
                    </div>
                )}
            </div>
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
              {t('login')} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-400 to-primary-700 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                {t('elevatePresence')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                {t('elevatePresenceDesc')}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/register"
                  className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  {t('getStarted')}
                </Link>
                <Link to="/services-list" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                  {t('viewServices')} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">{t('whyChooseUs')}</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t('whyChooseUsDesc')}
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <p className="text-center text-xs leading-5 text-gray-400">
            &copy; 2023 MENGSMM. {t('footerRights')}
            </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;