import { useAppContext } from '../contexts/AppContext';
import type { TabType } from '../types';
import { ElementsPanel } from './panels/ElementsPanel';
import { ConsolePanel } from './panels/ConsolePanel';
import { NetworkPanel } from './panels/NetworkPanel';
import { SourcesPanel } from './panels/SourcesPanel';
import { ApplicationPanel } from './panels/ApplicationPanel';
import { PerformancePanel } from './panels/PerformancePanel';
import { MemoryPanel } from './panels/MemoryPanel';

const DevToolsSimulator: React.FC = () => {
  const { activeTab, setActiveTab } = useAppContext();

  const tabs: { id: TabType; label: string }[] = [
    { id: 'elements', label: 'Elements' },
    { id: 'console', label: 'Console' },
    { id: 'network', label: 'Network' },
    { id: 'sources', label: 'Sources' },
    { id: 'application', label: 'Application' },
    { id: 'performance', label: 'Performance' },
    { id: 'memory', label: 'Memory' },
    // { id: 'lighthouse', label: 'Lighthouse' }, // 미구현이므로 주석처리
  ];

  const renderPanel = () => {
    switch (activeTab) {
      case 'elements':
        return <ElementsPanel />;
      case 'console':
        return <ConsolePanel />;
      case 'network':
        return <NetworkPanel />;
      case 'sources':
        return <SourcesPanel />;
      case 'application':
        return <ApplicationPanel />;
      case 'performance':
        return <PerformancePanel />;
      case 'memory':
        return <MemoryPanel />;
      default:
        return (
          <div className="unsupported-panel">
            <p>이 탭은 현재 DevTools 학습 앱의 실습 범위에 포함되지 않습니다.</p>
            <p>Elements, Console, Network 탭을 활용해 주세요.</p>
          </div>
        );
    }
  };

  return (
    <div className="devtools-simulator">
      <div className="devtools-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="devtools-panel">
        {renderPanel()}
      </div>
    </div>
  );
};

export default DevToolsSimulator;
