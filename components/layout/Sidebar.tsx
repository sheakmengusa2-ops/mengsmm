

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, ListOrdered, Wallet, Settings, Rocket, LifeBuoy, Share2, Award, SlidersHorizontal, Briefcase, Megaphone, Bell } from 'lucide-react';
import type { User } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_ANNOUNCEMENTS } from '../../constants';

interface SidebarProps {
    user: User;
}

// FIX: Define a type for navigation links to ensure type consistency for the 'hasBadge' property.
interface NavLinkItem {
    to: string;
    text: string;
    icon: React.ReactNode;
    hasBadge?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
    const { t } = useTranslation();
    const { siteName } = useTheme();
    const [hasUnread, setHasUnread] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (user.role === 'user') {
            const readAnnouncements: number[] = JSON.parse(localStorage.getItem(`read_announcements_user_${user.id}`) || '[]');
            const unreadCount = MOCK_ANNOUNCEMENTS.filter(a => !readAnnouncements.includes(a.id)).length;
            setHasUnread(unreadCount > 0);
        }
    }, [user, location.pathname]); // Re-check on location change

    const userNavLinks: NavLinkItem[] = [
        { to: '/', text: t('dashboard'), icon: <LayoutDashboard className="w-5 h-5" /> },
        { to: '/new-order', text: t('newOrder'), icon: <ShoppingCart className="w-5 h-5" /> },
        { to: '/orders', text: t('orders'), icon: <ListOrdered className="w-5 h-5" /> },
        { to: '/wallet', text: t('addFunds'), icon: <Wallet className="w-5 h-5" /> },
        { to: '/announcements', text: t('announcements'), icon: <Bell className="w-5 h-5" />, hasBadge: hasUnread },
        { to: '/levels', text: t('userLevels'), icon: <Award className="w-5 h-5" /> },
        { to: '/affiliates', text: t('affiliates'), icon: <Share2 className="w-5 h-5" /> },
        { to: '/support-tickets', text: t('supportTickets'), icon: <LifeBuoy className="w-5 h-5" /> },
    ];
    
    const adminNavLinks: NavLinkItem[] = [
        { to: '/', text: t('dashboard'), icon: <LayoutDashboard className="w-5 h-5" /> },
        { to: '/users', text: t('users'), icon: <Users className="w-5 h-5" /> },
        { to: '/services', text: t('services'), icon: <ShoppingCart className="w-5 h-5" /> },
        { to: '/providers', text: t('serviceProviders'), icon: <Briefcase className="w-5 h-5" /> },
        { to: '/orders', text: t('orders'), icon: <ListOrdered className="w-5 h-5" /> },
        { to: '/support-tickets', text: t('supportTickets'), icon: <LifeBuoy className="w-5 h-5" /> },
        { to: '/broadcast', text: t('broadcast'), icon: <Megaphone className="w-5 h-5" /> },
        { to: '/settings', text: t('settings'), icon: <SlidersHorizontal className="w-5 h-5" /> },
    ];
    

    const NavItem: React.FC<{ to: string; icon: React.ReactNode; text: string; hasBadge?: boolean }> = ({ to, icon, text, hasBadge }) => {
        const location = useLocation();
        const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));


        return (
            <li>
                <NavLink
                    to={to}
                    className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 relative ${
                        isActive
                            ? 'bg-primary-600 text-white shadow-lg'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                    {icon}
                    <span className="ml-3 font-medium">{text}</span>
                    {hasBadge && <span className="absolute top-2 right-2 block w-2 h-2 bg-red-500 rounded-full"></span>}
                </NavLink>
            </li>
        );
    };
    
    const navLinks = user.role === 'admin' ? adminNavLinks : userNavLinks;

    return (
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-2xl font-bold text-primary-600 dark:text-primary-400">
                    <Rocket className="w-8 h-8 mr-2"/>
                    <span>{siteName}</span>
                </div>
            </div>
            <nav className="flex-1 px-4 py-4">
                <ul>
                    {navLinks.map((link) => (
                        <NavItem key={link.to} to={link.to} icon={link.icon} text={link.text} hasBadge={link.hasBadge} />
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;