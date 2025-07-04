import React, { useState } from 'react';

const MemoryPanel: React.FC = () => {
  const [explanation, setExplanation] = useState(
    `<strong>메모리 패널</strong>은 <strong>메모리 사용량</strong> 측정, <strong>누수(Leak) 진단</strong>, <strong>스냅샷 분석</strong> 등으로 웹 앱의 메모리 문제를 파악할 수 있도록 도와줍니다.<br/><br/>
    <ul>
      <li>자바스크립트 객체의 메모리 사용량 측정</li>
      <li>스냅샷을 통한 객체 변화/증가 추이 분석</li>
      <li>Detached DOM, Closure 등 누수 원인 분석</li>
    </ul>
    <span class="example">예시: 여러 번 스냅샷을 찍어 객체 증가 확인, 누수 원인 분석</span>`
  );

  return (
    <div className="panel-content">
      <div className="panel-section">
        <h3>메모리 패널 학습</h3>
        <div className="explanation" dangerouslySetInnerHTML={{ __html: explanation }} />
      </div>
    </div>
  );
};

export { MemoryPanel }; 