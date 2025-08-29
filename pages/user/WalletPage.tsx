
import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { MOCK_TRANSACTIONS } from '../../constants';
import type { Transaction } from '../../types';
import { TransactionType } from '../../types';
import { Download } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const KHQRModal: React.FC<{ amount: number; onClose: () => void; onPaymentSuccess: (amount: number) => void }> = ({ amount, onClose, onPaymentSuccess }) => {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

    useEffect(() => {
        if (timeLeft === 0) {
             onClose();
             return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, onClose]);
    
    // Simulate payment success after some time
    useEffect(() => {
      const paymentTimeout = setTimeout(() => {
        onPaymentSuccess(amount);
      }, 10000); // 10 seconds for demo
      return () => clearTimeout(paymentTimeout);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount, onPaymentSuccess]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
                <h3 className="text-xl font-bold mb-2">{t('scanToPay')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('scanToPayDesc')}</p>
                
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT_FOR_${amount.toFixed(2)}`} alt="KHQR Code" className="mx-auto my-4 border-4 border-gray-200 rounded-lg" />
                
                <div className="my-4">
                    <p className="text-lg">{t('amountToPay')}:</p>
                    <p className="text-3xl font-bold text-primary-600">${amount.toFixed(2)}</p>
                </div>

                <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md p-2 text-sm">
                    {t('qrExpire')} {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
                 <p className="text-xs text-gray-500 mt-4">{t('demoPaymentNotice')}</p>
                
                <Button onClick={onClose} variant="secondary" className="mt-6 w-full">
                    {t('cancel')}
                </Button>
            </div>
        </div>
    );
};


const WalletPage: React.FC = () => {
    const [amount, setAmount] = useState('10.00');
    const [showModal, setShowModal] = useState(false);
    const { user, updateBalance, creditReferrer } = useAuth();
    const { t } = useTranslation();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    useEffect(() => {
      if (user) {
        setTransactions(MOCK_TRANSACTIONS.filter(t => t.userId === user.id));
      }
    }, [user]);

    const handleTopUp = () => {
        if (parseFloat(amount) > 0) {
            setShowModal(true);
        }
    };
    
    const handlePaymentSuccess = (paidAmount: number) => {
      if (!user) return;
      updateBalance(paidAmount);
      creditReferrer(user.id, paidAmount);
      
      const newTransaction: Transaction = {
        id: `TXN${Date.now()}`,
        userId: user.id,
        type: TransactionType.DEPOSIT,
        description: `KHQR Top-up`,
        amount: paidAmount,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'completed'
      };
      setTransactions([newTransaction, ...transactions]);
      setShowModal(false);
      alert('Payment successful! Your balance has been updated.');
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {showModal && <KHQRModal amount={parseFloat(amount)} onClose={() => setShowModal(false)} onPaymentSuccess={handlePaymentSuccess} />}
            <div className="lg:col-span-1">
                <Card title={t('addFundsKHQR')}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('amountUSD')}</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                                placeholder={t('amountPlaceholder')}
                                step="0.01"
                                min="1.00"
                            />
                        </div>
                        <div className="flex space-x-2">
                           {['5', '10', '20', '50'].map(val => (
                               <button key={val} onClick={() => setAmount(val)} className="flex-1 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                  ${val}
                               </button>
                           ))}
                        </div>
                        <Button onClick={handleTopUp} className="w-full" disabled={!amount || parseFloat(amount) <= 0}>
                            {t('generateKHQR')}
                        </Button>
                    </div>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card title={t('transactionHistory')} actions={<Button size="sm" variant="secondary"><Download className="w-4 h-4 mr-2" />{t('downloadPDF')}</Button>}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t('txnId')}</th>
                                    <th scope="col" className="px-6 py-3">{t('date')}</th>
                                    <th scope="col" className="px-6 py-3">{t('type')}</th>
                                    <th scope="col" className="px-6 py-3">{t('amount')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td className="px-6 py-4 font-mono text-xs">{tx.id}</td>
                                        <td className="px-6 py-4">{tx.createdAt}</td>
                                        <td className="px-6 py-4">{tx.type}</td>
                                        <td className={`px-6 py-4 font-semibold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default WalletPage;
