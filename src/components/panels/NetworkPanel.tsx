import React, { useState, useCallback } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import type { NetworkRequest } from '../../types';

type MockRequest = Omit<NetworkRequest, 'id' | 'timestamp'> & { explain: string };

const mockRequests: MockRequest[] = [
  {
    name: 'api/products',
    status: 200,
    type: 'fetch',
    url: 'https://api.example.com/products',
    time: 150,
    statusText: 'OK',
    explain:
      '성공적인 요청입니다. 상태 코드 200은 서버가 요청을 성공적으로 처리했음을 의미합니다.',
  },
  {
    name: 'api/users',
    status: 201,
    type: 'xhr',
    url: 'https://api.example.com/users',
    time: 220,
    statusText: 'Created',
    explain:
      '리소스가 성공적으로 생성되었습니다. 상태 코드 201은 POST 요청으로 새로운 리소스가 생성되었을 때 반환됩니다. 응답 헤더의 Location 필드에 새로 생성된 리소스의 URI가 포함될 수 있습니다.',
  },
  {
    name: 'api/profile',
    status: 401,
    type: 'fetch',
    url: 'https://api.example.com/profile',
    time: 100,
    statusText: 'Unauthorized',
    explain:
      '인증에 실패했습니다. 상태 코드 401은 요청에 유효한 인증 자격 증명이 없음을 의미합니다. 로그인이 필요하거나 토큰이 만료되었을 수 있습니다.',
  },
  {
    name: 'api/admin',
    status: 403,
    type: 'xhr',
    url: 'https://api.example.com/admin',
    time: 180,
    statusText: 'Forbidden',
    explain:
      '접근 권한이 없습니다. 상태 코드 403은 서버가 요청을 이해했지만, 권한이 거부되었음을 의미합니다. 관리자 권한이 필요한 페이지나 리소스에 접근할 때 발생할 수 있습니다.',
  },
  {
    name: 'api/nonexistent',
    status: 404,
    type: 'fetch',
    url: 'https://api.example.com/nonexistent',
    time: 120,
    statusText: 'Not Found',
    explain:
      '요청한 리소스를 찾을 수 없습니다. 상태 코드 404는 서버가 요청한 리소스를 찾을 수 없을 때 반환됩니다. 잘못된 URL을 요청했을 때 발생할 수 있습니다.',
  },
  {
    name: 'api/error',
    status: 500,
    type: 'xhr',
    url: 'https://api.example.com/error',
    time: 300,
    statusText: 'Internal Server Error',
    explain:
      '서버 내부 오류가 발생했습니다. 상태 코드 500은 서버에서 예상치 못한 오류가 발생했음을 의미합니다. 서버 로그를 확인하여 원인을 파악해야 합니다.',
  },
  {
    name: 'api/slow',
    status: 0,
    type: 'fetch',
    url: 'https://api.example.com/slow',
    time: 5000,
    statusText: 'Timeout',
    explain:
      '네트워크 요청이 시간 초과되었습니다. 서버 응답이 느리거나 네트워크 연결에 문제가 있을 수 있습니다. 요청을 재시도하거나 네트워크 연결을 확인해 주세요.',
  },
];

const getStatusClass = (status: number) =>
  status === 0
    ? 'status-timeout'
    : status >= 500
    ? 'status-error'
    : status >= 400
    ? 'status-warning'
    : status >= 200
    ? 'status-success'
    : '';

const getStatusText = (status: number, statusText: string) =>
  status === 0 ? 'TIMEOUT' : `${status} ${statusText}`;

const NetworkPanel: React.FC = () => {
  const { addNetworkRequest, clearNetworkRequests, networkRequests } =
    useAppContext();
  const [explanation, setExplanation] = useState(
    `<strong>네트워크 패널</strong>은 웹사이트가 서버와 주고받는 모든 <strong>요청/응답</strong>을 실시간으로 확인할 수 있습니다.<br/><br/>
    <ul>
      <li>XHR, Fetch 등 다양한 네트워크 요청 기록</li>
      <li>요청/응답 헤더, 바디, 상태코드 상세 분석</li>
      <li>요청 시간, 응답 속도, 에러 등 실시간 모니터링</li>
    </ul>
    <span class="example">아래 버튼을 눌러 다양한 네트워크 요청을 발생시켜보세요.<br/>상태코드(200, 404, 500 등)와 의미를 확인하세요.</span>
    <span class="tip">Tip: 실제 개발자 도구에서는 요청을 우클릭해 cURL로 복사하거나, 응답을 미리보기로 볼 수 있습니다.<br/>상태코드별로 색상이 다르게 표시되어 빠르게 문제를 찾을 수 있습니다.</span>`
  );

  const handleClick = useCallback(
    (req: MockRequest) => {
      const { explain, ...rest } = req;
      addNetworkRequest(rest);
      setExplanation(explain);
    },
    [addNetworkRequest]
  );

  const handleClear = useCallback(() => {
    clearNetworkRequests();
    setExplanation('네트워크 요청 기록을 모두 지웠습니다.');
  }, [clearNetworkRequests]);

  return (
    <div className="panel-content">
      <div className="panel-actions">
        {mockRequests.map(req => (
          <button
            key={req.name}
            className="action-button"
            onClick={() => handleClick(req)}
          >
            {req.name} ({req.status})
          </button>
        ))}
        <button className="action-button clear-button" onClick={handleClear}>
          기록 지우기
        </button>
      </div>

      <section className="panel-section">
        <h3>네트워크 요청</h3>
        {networkRequests.length ? (
          <table className="network-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Type</th>
                <th>URL</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {networkRequests.map(req => (
                <tr key={req.id}>
                  <td>{req.name}</td>
                  <td className={getStatusClass(req.status)}>
                    {getStatusText(req.status, req.statusText)}
                  </td>
                  <td>{req.type}</td>
                  <td className="url-cell">{req.url}</td>
                  <td>{req.time}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-message">
            네트워크 요청이 없습니다. 요청 버튼을 눌러보세요.
          </div>
        )}
      </section>

      <section className="panel-section">
        <h3>설명</h3>
        <div className="explanation" dangerouslySetInnerHTML={{ __html: explanation }} />
      </section>
    </div>
  );
};

export { NetworkPanel };
