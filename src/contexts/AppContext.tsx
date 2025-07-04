import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CardState, LogEntry, NetworkRequest, TabType } from '../types';

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cardState: CardState;
  setCardState: React.Dispatch<React.SetStateAction<CardState>>;
  logs: LogEntry[];
  addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  networkRequests: NetworkRequest[];
  addNetworkRequest: (request: Omit<NetworkRequest, 'id' | 'timestamp'>) => void;
  clearNetworkRequests: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('elements');
  const [cardState, setCardState] = useState<CardState>({
    text: '오늘의 추천 상품',
    className: 'card',
    style: {
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '0 auto',
      textAlign: 'center',
      fontSize: '18px',
      color: '#333',
    },
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>([]);

  const addLog = (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    const newLog: LogEntry = {
      id: crypto.randomUUID(),
      ...entry,
      timestamp: new Date(),
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const clearLogs = () => setLogs([]);

  const addNetworkRequest = (request: Omit<NetworkRequest, 'id' | 'timestamp'>) => {
    const newRequest: NetworkRequest = {
      id: crypto.randomUUID(),
      ...request,
      timestamp: new Date(),
    };
    setNetworkRequests((prev) => [...prev, newRequest]);
  };

  const clearNetworkRequests = () => setNetworkRequests([]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        cardState,
        setCardState,
        logs,
        addLog,
        clearLogs,
        networkRequests,
        addNetworkRequest,
        clearNetworkRequests,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
