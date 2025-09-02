import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface PaymentSession {
  payment_status: string;
  customer_email: string;
  amount_total: number;
  currency: string;
  metadata: {
    product_type: string;
    product_name: string;
  };
  session_id: string;
  timestamp: number;
}

interface PaymentContextType {
  paymentSession: PaymentSession | null;
  isPaymentVerified: boolean;
  isLoading: boolean;
  error: string | null;
  verifyPayment: (sessionId: string) => Promise<boolean>;
  clearPayment: () => void;
  hasValidPayment: () => boolean;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Payment storage utility
class PaymentStorage {
  private static readonly STORAGE_KEY = 'stripe_payment_session';
  private static readonly EXPIRY_HOURS = 24; // Sessions expire after 24 hours

  static save(session: PaymentSession): void {
    try {
      const sessionWithTimestamp = {
        ...session,
        timestamp: Date.now()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessionWithTimestamp));
    } catch (error) {
      console.error('Failed to save payment session:', error);
    }
  }

  static load(): PaymentSession | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const session: PaymentSession = JSON.parse(stored);
      
      // Check if session has expired
      const expiryTime = session.timestamp + (this.EXPIRY_HOURS * 60 * 60 * 1000);
      if (Date.now() > expiryTime) {
        this.clear();
        return null;
      }

      return session;
    } catch (error) {
      console.error('Failed to load payment session:', error);
      this.clear();
      return null;
    }
  }

  static clear(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear payment session:', error);
    }
  }

  static hasValidSession(): boolean {
    const session = this.load();
    return session !== null && session.payment_status === 'paid';
  }
}

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [paymentSession, setPaymentSession] = useState<PaymentSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load payment session from localStorage on mount
  useEffect(() => {
    const storedSession = PaymentStorage.load();
    if (storedSession) {
      setPaymentSession(storedSession);
    }
  }, []);

  const verifyPayment = async (sessionId: string): Promise<boolean> => {
    if (!sessionId) {
      setError('No session ID provided');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/verify-session/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }
      
      const sessionData = await response.json();
      
      if (sessionData.payment_status === 'paid') {
        const fullSession: PaymentSession = {
          ...sessionData,
          session_id: sessionId,
          timestamp: Date.now()
        };
        
        setPaymentSession(fullSession);
        PaymentStorage.save(fullSession);
        return true;
      } else {
        setError('Payment not completed');
        return false;
      }
    } catch (err) {
      console.error('Payment verification failed:', err);
      setError('Failed to verify payment. Please contact support.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearPayment = (): void => {
    setPaymentSession(null);
    setError(null);
    PaymentStorage.clear();
  };

  const hasValidPayment = (): boolean => {
    return paymentSession !== null && paymentSession.payment_status === 'paid';
  };

  const isPaymentVerified = hasValidPayment();

  const contextValue: PaymentContextType = {
    paymentSession,
    isPaymentVerified,
    isLoading,
    error,
    verifyPayment,
    clearPayment,
    hasValidPayment
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export { PaymentStorage };