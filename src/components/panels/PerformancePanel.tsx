import React, { useState } from 'react';

const PerformancePanel: React.FC = () => {
  const [explanation] = useState(
    `<strong>퍼포먼스 패널</strong>은 웹사이트의 <strong>성능 측정</strong>과 <strong>타임라인 분석</strong>을 통해 병목 구간을 찾고, 최적화 포인트를 파악할 수 있도록 도와줍니다.<br/><br/>
    <ul>
      <li>렌더링, 스크립트 실행, 레이아웃, 페인트 등 성능 측정</li>
      <li>타임라인을 통한 병목 구간 분석</li>
      <li>주요 이벤트별 성능 비교</li>
    </ul>
    <span class="example">예시: Record(녹화) 버튼으로 성능 측정 시작, 타임라인에서 느린 구간 분석</span>`
  );

  return (
    <div className="panel-content">
      <div className="panel-section">
        <h3>퍼포먼스 패널 학습</h3>
        <div className="explanation" dangerouslySetInnerHTML={{ __html: explanation }} />
      </div>
    </div>
  );
};

export { PerformancePanel }; 