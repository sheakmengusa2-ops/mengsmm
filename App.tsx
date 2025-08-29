

import React, { useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import UserDashboard from './pages/user/UserDashboard';
import NewOrderPage from './pages/user/NewOrderPage';
import OrdersPage from './pages/user/OrdersPage';
import WalletPage from './pages/user/WalletPage';
import SupportTicketsPage from './pages/user/SupportTicketsPage';
import AffiliatesPage from './pages/user/AffiliatesPage';
import UserLevelsPage from './pages/user/UserLevelsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageServicesPage from './pages/admin/ManageServicesPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage';
import ManageTicketsPage from './pages/admin/ManageTicketsPage';
import TicketDetailPage from './pages/shared/TicketDetailPage';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import LandingPage from './pages/public/LandingPage';
import ServicesPage from './pages/public/ServicesPage';
import type { User } from './types';


const App: React.FC = () => {
    return (
        <LanguageProvider>
            <AuthProvider>
                <ThemeProvider>
                    <HashRouter>
                        <AppContent />
                    </HashRouter>
                </ThemeProvider>
            </AuthProvider>
        </LanguageProvider>
    );
};

const AppContent: React.FC = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null; // Or a loading spinner
    }

    const { user } = authContext;

    if (!user) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/services-list" element={<ServicesPage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        );
    }
    
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar user={user} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header user={user} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
                    <Routes>
                        {user.role === 'admin' ? (
                            <>
                                <Route path="/" element={<AdminDashboard />} />
                                <Route path="/users" element={<ManageUsersPage />} />
                                <Route path="/services" element={<ManageServicesPage />} />
                                <Route path="/orders" element={<ManageOrdersPage />} />
                                <Route path="/support-tickets" element={<ManageTicketsPage />} />
                                <Route path="/support-tickets/:ticketId" element={<TicketDetailPage />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </>
                        ) : (
                            <>
                                <Route path="/" element={<UserDashboard />} />
                                <Route path="/new-order" element={<NewOrderPage />} />
                                <Route path="/orders" element={<OrdersPage />} />
                                <Route path="/wallet" element={<WalletPage />} />
                                <Route path="/support-tickets" element={<SupportTicketsPage />} />
                                <Route path="/support-tickets/:ticketId" element={<TicketDetailPage />} />
                                <Route path="/affiliates" element={<AffiliatesPage />} />
                                <Route path="/levels" element={<UserLevelsPage />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </>
                        )}
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;