export interface LogEntry {
  id: string;
  type: 'log' | 'warn' | 'error' | 'info';
  message: string;
  timestamp: Date;
  data?: any[];
}

export interface NetworkRequest {
  id: string;
  name: string;
  status: number;
  type: string;
  url: string;
  time: number;
  timestamp: Date;
  statusText: string;
}

export interface CardState {
  text: string;
  className: string;
  style: React.CSSProperties;
}

export type TabType = 'elements' | 'console' | 'network' | 'sources' | 'application' | 'performance' | 'memory' | 'lighthouse';

export interface Scenario {
  id: string;
  title: string;
  explain: string;
  action: () => void;
}

export interface PanelProps {
  cardState: CardState;
  setCardState: React.Dispatch<React.SetStateAction<CardState>>;
  addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  addNetworkRequest: (request: Omit<NetworkRequest, 'id' | 'timestamp'>) => void;
}
