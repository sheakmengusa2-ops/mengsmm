

import React from 'react';
import type { User, Service, ServiceProvider, Order, Transaction, Ticket, TicketMessage, UserLevelKey, UserLevel, Announcement } from './types';
import { OrderStatus, TransactionType, TicketStatus } from './types';
import { Medal, Gem } from 'lucide-react';

export const MOCK_USERS: User[] = [
  { id: 1, username: 'Admin User', email: 'admin@demo.com', role: 'admin', balance: 1000.00, spent: 520.50, registrationDate: '2023-01-15 10:30:15', lastLogin: '2023-10-28 09:15:22', status: 'active' },
  { id: 2, username: 'Regular User', email: 'user@demo.com', role: 'user', balance: 50.75, spent: 120.25, registrationDate: '2023-02-20 14:00:30', lastLogin: '2023-10-27 18:45:05', status: 'active' },
  { id: 3, username: 'John Doe', email: 'john.d@example.com', role: 'user', balance: 125.50, spent: 75.00, registrationDate: '2023-03-10 08:00:55', lastLogin: '2023-10-28 11:30:10', status: 'active', referrerId: 2 },
  { id: 4, username: 'Jane Smith', email: 'jane.s@example.com', role: 'user', balance: 0.00, spent: 25.00, registrationDate: '2023-04-05 16:20:00', lastLogin: '2023-09-01 20:00:18', status: 'blocked' },
  { id: 5, username: 'Michael Brown', email: 'michael.b@example.com', role: 'user', balance: 250.00, spent: 300.75, registrationDate: '2023-05-12 11:10:43', lastLogin: '2023-10-26 13:05:33', status: 'active' },
];

export const MOCK_PROVIDERS: ServiceProvider[] = [
  { id: 1, name: 'SMMRush API', apiUrl: 'https://smmrush.com/api/v2', apiKey: 'key_live_123abc456def' },
  { id: 2, name: 'PeakSMM Panel', apiUrl: 'https://peaksmm.com/api/v2', apiKey: 'key_live_789ghi012jkl' },
];

export const MOCK_SERVICES: Service[] = [
  { id: 101, name: 'Instagram Followers [High Quality]', category: 'Instagram', rate: 1.20, cost: 0.80, min: 100, max: 10000, description: 'Real-looking followers with fast delivery.', providerId: 1 },
  { id: 102, name: 'Instagram Likes [Instant]', category: 'Instagram', rate: 0.50, cost: 0.35, min: 50, max: 5000, description: 'High-quality likes from active profiles.', providerId: 1 },
  { id: 201, name: 'TikTok Views [HQ]', category: 'TikTok', rate: 0.01, cost: 0.005, min: 1000, max: 1000000, description: 'Boost your video views quickly.', providerId: 2 },
  { id: 202, name: 'TikTok Followers', category: 'TikTok', rate: 2.50, cost: 1.90, min: 100, max: 5000, description: 'Grow your TikTok profile audience.', providerId: 2 },
  { id: 301, name: 'YouTube Views [Non-Drop]', category: 'YouTube', rate: 2.00, cost: 1.50, min: 1000, max: 50000, description: 'Views from real users, guaranteed not to drop.', providerId: 1 },
  { id: 302, name: 'YouTube Subscribers', category: 'YouTube', rate: 15.00, cost: 12.50, min: 100, max: 1000, description: 'Increase your channel subscribers count.' },
  { id: 401, name: 'Manual Service - FB Page Likes', category: 'Facebook', rate: 5.00, cost: 0, min: 100, max: 1000, description: 'Likes delivered manually by our team.', providerId: undefined },
];

export const MOCK_ORDERS: Order[] = [
  { id: 1001, userId: 2, serviceId: 101, serviceName: 'Instagram Followers [High Quality]', link: 'instagram.com/user1', quantity: 1000, charge: 1.20, start_count: 500, remains: 0, status: OrderStatus.COMPLETED, createdAt: '2023-10-25' },
  { id: 1002, userId: 2, serviceId: 201, serviceName: 'TikTok Views [HQ]', link: 'tiktok.com/@user/video/123', quantity: 50000, charge: 0.50, start_count: 1200, remains: 25000, status: OrderStatus.IN_PROGRESS, createdAt: '2023-10-26' },
  { id: 1003, userId: 3, serviceId: 301, serviceName: 'YouTube Views [Non-Drop]', link: 'youtube.com/watch?v=abc', quantity: 10000, charge: 20.00, start_count: 250, remains: 0, status: OrderStatus.PENDING, createdAt: '2023-10-27' },
  { id: 1004, userId: 2, serviceId: 102, serviceName: 'Instagram Likes [Instant]', link: 'instagram.com/p/postid', quantity: 500, charge: 0.25, start_count: 120, remains: 500, status: OrderStatus.CANCELED, createdAt: '2023-10-22' },
   { id: 1005, userId: 4, serviceId: 202, serviceName: 'TikTok Followers', link: 'tiktok.com/@user2', quantity: 200, charge: 5.00, start_count: 1000, remains: 0, status: OrderStatus.PARTIAL, createdAt: '2023-10-21' },
   { id: 1006, userId: 5, serviceId: 102, serviceName: 'Instagram Likes [Instant]', link: 'instagram.com/p/anotherpost', quantity: 10000, charge: 5.00, start_count: 0, remains: 10000, status: OrderStatus.DRIP_FEED, createdAt: '2023-10-29', runs: 10, interval: 30 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'TXN1001', userId: 2, type: TransactionType.DEPOSIT, amount: 20.00, description: 'KHQR Top-up Ref: KHD123', createdAt: '2023-10-25', status: 'completed' },
    { id: 'TXN1002', userId: 2, type: TransactionType.ORDER, amount: -1.20, description: 'Order #1001', createdAt: '2023-10-25', status: 'completed' },
    { id: 'TXN1003', userId: 2, type: TransactionType.ORDER, amount: -0.50, description: 'Order #1002', createdAt: '2023-10-26', status: 'completed' },
    { id: 'TXN1004', userId: 3, type: TransactionType.DEPOSIT, amount: 150.00, description: 'KHQR Top-up Ref: KHD456', createdAt: '2023-10-27', status: 'completed' },
    { id: 'TXN1005', userId: 3, type: TransactionType.ORDER, amount: -20.00, description: 'Order #1003', createdAt: '2023-10-27', status: 'completed' },
    { id: 'TXN1006', userId: 2, type: TransactionType.REFUND, amount: 0.10, description: 'Refund for Order #1004', createdAt: '2023-10-28', status: 'completed' },
    { id: 'TXN1007', userId: 1, type: TransactionType.ADMIN_CREDIT, amount: 1000.00, description: 'Initial balance', createdAt: '2023-01-15', status: 'completed'},
];

export const MOCK_TICKETS: Ticket[] = [
  { id: 2001, userId: 2, username: 'Regular User', subject: 'My order #1002 is stuck', createdAt: '2023-10-28', lastUpdated: '2023-10-28', status: TicketStatus.OPEN },
  { id: 2002, userId: 3, username: 'John Doe', subject: 'Issue with adding funds', createdAt: '2023-10-27', lastUpdated: '2023-10-28', status: TicketStatus.IN_PROGRESS },
  { id: 2003, userId: 2, username: 'Regular User', subject: 'Question about service #301', createdAt: '2023-10-26', lastUpdated: '2023-10-26', status: TicketStatus.CLOSED },
];

export const MOCK_TICKET_MESSAGES: TicketMessage[] = [
  // Ticket 2001
  { id: 3001, ticketId: 2001, senderId: 2, message: 'Hello, my order with ID 1002 has been "In Progress" for over a day. Can you please check?', createdAt: '2023-10-28 10:00', isFromAdmin: false },
  
  // Ticket 2002
  { id: 3002, ticketId: 2002, senderId: 3, message: 'I tried to add funds via KHQR but it failed. Can you assist?', createdAt: '2023-10-27 14:00', isFromAdmin: false },
  { id: 3003, ticketId: 2002, senderId: 1, message: 'Hi John, we are looking into it. Can you please provide the transaction reference if you have one?', createdAt: '2023-10-28 09:30', isFromAdmin: true },
  
  // Ticket 2003
  { id: 3004, ticketId: 2003, senderId: 2, message: 'What is the guarantee for YouTube Views [Non-Drop] service?', createdAt: '2023-10-26 11:00', isFromAdmin: false },
  { id: 3005, ticketId: 2003, senderId: 1, message: 'It has a 30-day non-drop guarantee.', createdAt: '2023-10-26 11:15', isFromAdmin: true },
  { id: 3006, ticketId: 2003, senderId: 2, message: 'Great, thank you!', createdAt: '2023-10-26 11:20', isFromAdmin: false },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 1, title: 'Welcome to MENGSMM!', content: 'We are happy to have you here. Explore our services and start boosting your social media presence today!', createdAt: '2023-10-28' },
  { id: 2, title: 'New TikTok Services Added', content: 'We have just added new high-quality TikTok follower and view services. Check them out in the New Order page!', createdAt: '2023-10-29' },
];

export const USER_LEVELS: Record<UserLevelKey, UserLevel> = {
  BRONZE: { name: 'Bronze', minSpent: 0, discount: 0, color: 'text-orange-500', icon: Medal },
  SILVER: { name: 'Silver', minSpent: 100, discount: 0.02, color: 'text-gray-400', icon: Medal },
  GOLD: { name: 'Gold', minSpent: 500, discount: 0.05, color: 'text-yellow-500', icon: Medal },
  PLATINUM: { name: 'Platinum', minSpent: 1000, discount: 0.08, color: 'text-indigo-400', icon: Gem },
};