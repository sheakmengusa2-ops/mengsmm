

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  balance: number;
  spent: number;
  registrationDate: string;
  lastLogin: string;
  status: 'active' | 'blocked';
  referrerId?: number;
}

export interface ServiceProvider {
  id: number;
  name: string;
  apiUrl: string;
  apiKey: string;
}

export interface Service {
  id: number;
  name: string;
  category: string;
  rate: number; // Price per 1000 for users
  cost: number; // Cost per 1000 from provider
  min: number;
  max: number;
  description: string;
  providerId?: number;
}

export enum OrderStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  PARTIAL = 'Partial',
  CANCELED = 'Canceled',
  PROCESSING = 'Processing',
  DRIP_FEED = 'Drip-feed',
}

export interface Order {
  id: number;
  userId: number;
  serviceId: number;
  serviceName: string;
  link: string;
  quantity: number;
  charge: number;
  start_count: number;
  remains: number;
  status: OrderStatus;
  createdAt: string;
  runs?: number;
  interval?: number;
}

export enum TransactionType {
  DEPOSIT = 'Deposit',
  ORDER = 'Order Placement',
  REFUND = 'Refund',
  ADMIN_CREDIT = 'Admin Credit',
  ADMIN_DEBIT = 'Admin Debit',
  COMMISSION = 'Affiliate Commission',
}

export interface Transaction {
  id: string;
  userId: number;
  type: TransactionType;
  amount: number;
  description: string;
  createdAt: string;
  status: 'completed' | 'pending' | 'failed';
}

export enum TicketStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  CLOSED = 'Closed',
}

export interface Ticket {
  id: number;
  userId: number;
  username: string;
  subject: string;
  createdAt: string;
  lastUpdated: string;
  status: TicketStatus;
}

export interface TicketMessage {
  id: number;
  ticketId: number;
  senderId: number;
  message: string;
  createdAt: string;
  isFromAdmin: boolean;
}

export type UserLevelKey = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface UserLevel {
    name: string;
    minSpent: number;
    discount: number;
    color: string;
    icon: React.ElementType;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}