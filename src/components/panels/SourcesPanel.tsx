import React, { useState } from 'react';

const codeLines = [
  'function sum(a, b) {',
  '  const result = a + b;',
  '  return result;',
  '}',
  'const total = sum(3, 5);',
  'console.log(total);',
];

const SourcesPanel: React.FC = () => {
  const [explanation, setExplanation] = useState(
    `<strong>소스 패널</strong>은 <strong>코드 디버깅</strong>과 <strong>브레이크포인트</strong> 설정, <strong>변수 값 확인</strong> 등 개발자가 코드의 흐름을 추적하고 문제를 빠르게 찾을 수 있도록 도와줍니다.<br/><br/>
    <ul>
      <li>자바스크립트 파일 탐색</li>
      <li>브레이크포인트 추가/삭제 (줄 번호 클릭!)</li>
      <li>코드 실행 중단 및 변수 값 실시간 확인</li>
      <li>호출 스택(Call Stack) 분석</li>
    </ul>
    <span class="example">예시: 브레이크포인트를 추가해 코드가 멈추는 지점 확인, 변수 값 변경 및 Watch 활용</span>`
  );
  const [breakpoints, setBreakpoints] = useState<number[]>([]);

  const toggleBreakpoint = (line: number) => {
    setBreakpoints((prev) =>
      prev.includes(line)
        ? prev.filter((l) => l !== line)
        : [...prev, line]
    );
  };

  return (
    <div className="panel-content">
      <div className="panel-section">
        <h3>코드 예시 (줄 번호 클릭 시 브레이크포인트!)</h3>
        <div style={{ background: '#23272e', borderRadius: 6, padding: 12, fontFamily: 'monospace', fontSize: 15 }}>
          {codeLines.map((line, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', background: breakpoints.includes(idx) ? '#2d3a4a' : 'transparent' }}>
              <span
                onClick={() => toggleBreakpoint(idx)}
                style={{
                  cursor: 'pointer',
                  color: breakpoints.includes(idx) ? '#ff5252' : '#888',
                  fontWeight: breakpoints.includes(idx) ? 700 : 400,
                  width: 28,
                  userSelect: 'none',
                  display: 'inline-block',
                  textAlign: 'right',
                  marginRight: 8,
                }}
                title={breakpoints.includes(idx) ? '브레이크포인트 해제' : '브레이크포인트 추가'}
              >
                {breakpoints.includes(idx) ? '●' : idx + 1}
              </span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="panel-section">
        <h3>소스 패널 학습</h3>
        <div className="explanation" dangerouslySetInnerHTML={{ __html: explanation }} />
      </div>
    </div>
  );
};

export { SourcesPanel }; 