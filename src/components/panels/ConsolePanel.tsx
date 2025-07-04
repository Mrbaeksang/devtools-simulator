import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { useAppContext } from '../../contexts/AppContext';
import type { LogEntry } from '../../types';

const ConsolePanel: React.FC = () => {
  const { logs, addLog, clearLogs } = useAppContext();
  const [explanation, setExplanation] = useState(
    `<strong>콘솔 패널</strong>은 자바스크립트 코드를 직접 실행하고, 다양한 메시지를 실시간으로 확인할 수 있습니다.<br/><br/>
    <ul>
      <li>로그: <strong>console.log</strong></li>
      <li>경고: <strong>console.warn</strong></li>
      <li>에러: <strong>console.error</strong></li>
      <li>정보: <strong>console.info</strong></li>
      <li>표 출력: <strong>console.table</strong></li>
    </ul>
    <span class="example">아래 버튼을 눌러 다양한 로그를 출력해보세요.<br/>TypeError 버튼으로 실제 에러를 발생시켜보고, 에러 메시지를 확인하세요.<br/>console.table 버튼으로 표 출력도 실습해보세요.</span>
    <span class="tip">Tip: 객체는 <strong>console.table(obj)</strong>로 표 형태로 볼 수 있습니다.<br/>변수나 함수명을 입력하면 현재 값/정의도 바로 확인할 수 있습니다.</span>`
  );
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [tableData, setTableData] = useState<any[] | null>(null);

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleAction = (type: LogEntry['type'], message: string, explain: string) => {
    addLog({ type, message });
    setExplanation(explain);
  };

  const actions = [
    {
      label: '로그 메시지',
      action: () => handleAction(
        'log', 
        '이것은 일반 로그 메시지입니다.',
        'console.log()는 일반적인 로깅에 사용되며, 디버깅 정보를 출력합니다.'
      )
    },
    {
      label: '경고 메시지',
      action: () => handleAction(
        'warn', 
        '이것은 경고 메시지입니다. 주의가 필요합니다!',
        'console.warn()은 경고 메시지를 노란색으로 강조하여 표시합니다. 잠재적인 문제를 알릴 때 사용합니다.'
      )
    },
    {
      label: '에러 메시지',
      action: () => handleAction(
        'error', 
        '이것은 에러 메시지입니다! 문제가 발생했습니다!',
        'console.error()는 오류 메시지를 빨간색으로 강조하여 표시합니다. 애플리케이션에서 발생한 오류를 로깅할 때 사용합니다.'
      )
    },
    {
      label: '정보 메시지',
      action: () => handleAction(
        'info', 
        '이것은 정보성 메시지입니다. (i)',
        'console.info()는 정보성 메시지를 출력할 때 사용합니다. 일반 로그와 유사하지만, 정보를 강조할 때 유용합니다.'
      )
    },
    {
      label: 'TypeError 발생',
      action: () => {
        try {
          const obj = null;
          (obj as any).someMethod();
        } catch (error) {
          handleAction(
            'error', 
            `TypeError: ${(error as Error).message}\n    at ConsolePanel.tsx:60:15`,
            'TypeError는 변수나 속성이 존재하지 않거나, 잘못된 타입으로 접근하려고 할 때 발생합니다. 주로 null/undefined 참조나 메서드 호출 오류에서 발생합니다.'
          );
        }
      }
    },
    {
      label: 'console.table',
      action: () => {
        const data = [
          { 이름: '홍길동', 나이: 28, 직업: '개발자' },
          { 이름: '김철수', 나이: 32, 직업: '디자이너' },
          { 이름: '이영희', 나이: 25, 직업: '기획자' },
        ];
        setTableData(data);
        setExplanation('console.table()로 객체 배열을 표 형태로 출력했습니다.');
      }
    },
    {
      label: '콘솔 지우기',
      action: () => {
        clearLogs();
        setTableData(null);
        setExplanation('콘솔 로그를 모두 지웠습니다.');
      }
    },
  ];

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'warn': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '▶️';
    }
  };

  const getLogClass = (type: LogEntry['type']) => {
    return `log-entry log-${type}`;
  };

  return (
    <div className="panel-content">
      <div className="panel-actions">
        {actions.map((item, index) => (
          <button
            key={index}
            className="action-button"
            onClick={item.action}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="panel-section console-output">
        <div className="console-header">
          <h3>콘솔 출력</h3>
          <button 
            className="clear-button"
            onClick={() => {
              clearLogs();
              setTableData(null);
              setExplanation('콘솔 로그를 모두 지웠습니다.');
            }}
          >
            콘솔 지우기
          </button>
        </div>
        <div className="console-logs">
          {logs.length === 0 ? (
            <div className="empty-console">
              콘솔 로그가 없습니다. 위의 버튼을 눌러 로그를 생성해보세요.
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className={getLogClass(log.type)}>
                <span className="log-time">
                  {format(log.timestamp, 'HH:mm:ss')}
                </span>
                <span className="log-icon">
                  {getLogIcon(log.type)}
                </span>
                <span className="log-message">
                  {String(log.message)}
                </span>
              </div>
            ))
          )}
          <div ref={logsEndRef} />
        </div>
        {tableData && (
          <div style={{ margin: '16px 0' }}>
            <h4>console.table 결과</h4>
            <table className="storage-table">
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, i) => (
                      <td key={i}>{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="panel-section">
        <h3>설명</h3>
        <div className="explanation" dangerouslySetInnerHTML={{ __html: explanation }} />
      </div>
    </div>
  );
};

export { ConsolePanel };
