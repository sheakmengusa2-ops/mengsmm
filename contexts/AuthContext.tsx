

import React, { createContext, useState, ReactNode } from 'react';
import type { User, Transaction } from '../types';
import { MOCK_USERS, MOCK_TRANSACTIONS } from '../constants';
import { TransactionType } from '../types';

interface AuthContextType {
    user: User | null;
    users: User[];
    login: (email: string, role: 'user' | 'admin') => void;
    logout: () => void;
    updateBalance: (newBalance: number) => void;
    register: (username: string, email: string, referrerId?: number) => Promise<void>;
    creditReferrer: (depositingUserId: number, depositAmount: number) => void;
    placeNewOrder: (charge: number) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(MOCK_USERS);

    const login = (email: string, role: 'user' | 'admin') => {
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
        if(foundUser) {
            setUser(foundUser);
        } else {
            const defaultUser = role === 'admin' 
                ? users.find(u => u.role === 'admin') 
                : users.find(u => u.role === 'user');
            setUser(defaultUser || null);
        }
    };

    const register = (username: string, email: string, referrerId?: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (existingUser) {
                reject(new Error('Email already exists.'));
                return;
            }

            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const newUser: User = {
                id: users.length + 1,
                username,
                email,
                role: 'user',
                balance: 0,
                spent: 0,
                registrationDate: now,
                lastLogin: now,
                status: 'active',
                referrerId: referrerId,
            };

            setUsers(prevUsers => [...prevUsers, newUser]);
            setUser(newUser);
            resolve();
        });
    };

    const logout = () => {
        setUser(null);
    };
    
    const updateBalance = (amount: number) => {
        if (user) {
            const updatedUser = { ...user, balance: user.balance + amount };
            setUser(updatedUser);
            setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));
        }
    };

    const placeNewOrder = (charge: number) => {
        if (user) {
            const updatedUser = { 
                ...user, 
                balance: user.balance - charge,
                spent: user.spent + charge 
            };
            setUser(updatedUser);
            setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));
        }
    };

    const creditReferrer = (depositingUserId: number, depositAmount: number) => {
        const depositingUser = users.find(u => u.id === depositingUserId);
        if (depositingUser && depositingUser.referrerId) {
            const referrer = users.find(u => u.id === depositingUser.referrerId);
            if (referrer) {
                const commissionRate = 0.05; // 5%
                const commission = depositAmount * commissionRate;
                
                const updatedReferrer = { ...referrer, balance: referrer.balance + commission };
                
                // If the currently logged-in user is the referrer, update their context state too
                if (user && user.id === updatedReferrer.id) {
                    setUser(updatedReferrer);
                }
                
                setUsers(prevUsers => prevUsers.map(u => u.id === referrer.id ? updatedReferrer : u));
                
                // This is a hack for the demo to add a transaction to the global mock data.
                const newTransaction: Transaction = {
                    id: `TXN_COM_${Date.now()}`,
                    userId: referrer.id,
                    type: TransactionType.COMMISSION,
                    amount: commission,
                    description: `Commission from ${depositingUser.username}`,
                    createdAt: new Date().toISOString().split('T')[0],
                    status: 'completed'
                };
                MOCK_TRANSACTIONS.unshift(newTransaction);
            }
        }
    };


    return (
        <AuthContext.Provider value={{ user, users, login, logout, updateBalance, register, creditReferrer, placeNewOrder }}>
            {children}
        </AuthContext.Provider>
    );
};