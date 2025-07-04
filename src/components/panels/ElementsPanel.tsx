import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAppContext } from '../../contexts/AppContext';

const ElementsPanel: React.FC = () => {
  const { cardState, setCardState, addLog } = useAppContext();
  const [explanation, setExplanation] = useState(
    `<strong>엘리먼트 패널</strong>은 웹 페이지의 <strong>DOM 구조</strong>를 실시간으로 탐색하고, <strong>HTML/CSS 스타일</strong>을 직접 수정할 수 있는 곳입니다.<br/><br/>
    <ul>
      <li>DOM 트리 구조 탐색 및 요소 선택</li>
      <li>HTML 속성, 텍스트, 클래스, 스타일 실시간 변경</li>
      <li>요소에 직접 스타일 추가/삭제</li>
      <li>클래스 토글로 동적 스타일 실습</li>
    </ul>
    <span class="example">아래 버튼을 눌러 텍스트, 배경색, 테두리, 클래스를 바꿔보세요.<br/>HTML 구조와 스타일이 어떻게 바뀌는지 확인하세요.</span>
    <span class="tip">Tip: 실제 개발자 도구에서는 요소를 우클릭해 "요소 검사"로 바로 접근할 수 있습니다.</span>`
  );

  const updateCardState = (updates: Partial<typeof cardState>) => {
    setCardState(prev => ({
      ...prev,
      ...updates,
      style: {
        ...prev.style,
        ...updates.style,
      },
    }));
  };

  const handleAction = (action: () => void, explain: string) => {
    action();
    setExplanation(explain);
  };

  // 스타일 수정 핸들러
  const handleStyleChange = (key: keyof React.CSSProperties, value: string) => {
    updateCardState({ style: { ...cardState.style, [key]: value } });
  };
  const handleClassNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCardState({ className: e.target.value });
  };

  const actions = [
    {
      label: '텍스트 변경',
      action: () => updateCardState({ text: '로그인하여 더 많은 혜택을!' }),
      explain: '요소의 텍스트를 변경했습니다. 웹 페이지에서 사용자에게 보여지는 텍스트는 innerText 속성으로 조작할 수 있습니다.'
    },
    {
      label: '배경색 변경',
      action: () => updateCardState({
        style: { ...cardState.style, backgroundColor: '#e3f2fd' }
      }),
      explain: '요소의 배경색을 변경했습니다. CSS의 background-color 속성으로 요소의 배경색을 변경할 수 있습니다.'
    },
    {
      label: '테두리 추가',
      action: () => updateCardState({
        style: { 
          ...cardState.style, 
          border: '2px solid #4caf50',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }
      }),
      explain: '요소에 테두리를 추가했습니다. CSS의 border 속성으로 요소의 테두리 스타일을 지정할 수 있습니다.'
    },
    {
      label: '클래스 토글',
      action: () => {
        const hasHighlight = cardState.className.includes('highlight');
        updateCardState({
          className: hasHighlight 
            ? cardState.className.replace(' highlight', '') 
            : `${cardState.className} highlight`
        });
      },
      explain: '요소의 클래스를 토글했습니다. 클래스를 추가하거나 제거하여 요소의 스타일을 변경할 수 있습니다.'
    },
    {
      label: '초기화',
      action: () => updateCardState({
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
      }),
      explain: '모든 변경 사항을 초기화했습니다. 요소를 원래 상태로 되돌립니다.'
    },
  ];

  // Generate HTML for the card
  const cardHtml = `
    <div id="interactive-card" 
         class="${cardState.className}" 
         style="${Object.entries(cardState.style)
           .map(([key, value]) => `${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${value}`)
           .join('; ')}">
      ${cardState.text}
    </div>
  `;

  return (
    <div className="panel-content">
      <div className="panel-actions">
        {actions.map((item, index) => (
          <button
            key={index}
            className="action-button"
            onClick={() => handleAction(item.action, item.explain)}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="panel-section" style={{ display: 'flex', gap: 32 }}>
        <div style={{ flex: 2 }}>
          <h3>HTML 구조</h3>
          <div className="code-container">
            <SyntaxHighlighter 
              language="html" 
              style={vscDarkPlus}
              customStyle={{ margin: 0, borderRadius: '4px' }}
            >
              {cardHtml.trim()}
            </SyntaxHighlighter>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <h3>Styles</h3>
          <div className="styles-view">
            <div style={{ marginBottom: 8 }}>
              <label>className: </label>
              <input type="text" value={cardState.className} onChange={handleClassNameChange} style={{ width: '100%' }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>backgroundColor: </label>
              <input type="color" value={cardState.style.backgroundColor as string || '#f8f9fa'} onChange={e => handleStyleChange('backgroundColor', e.target.value)} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>color: </label>
              <input type="color" value={cardState.style.color as string || '#333333'} onChange={e => handleStyleChange('color', e.target.value)} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>fontSize: </label>
              <input type="number" min={10} max={48} value={parseInt((cardState.style.fontSize as string || '18').toString())} onChange={e => handleStyleChange('fontSize', e.target.value + 'px')} /> px
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>borderRadius: </label>
              <input type="number" min={0} max={32} value={parseInt((cardState.style.borderRadius as string || '8').toString())} onChange={e => handleStyleChange('borderRadius', e.target.value + 'px')} /> px
            </div>
          </div>
        </div>
      </div>
      
      <div className="panel-section">
        <h3>설명</h3>
        <div className="explanation" dangerouslySetInnerHTML={{ __html: explanation }} />
      </div>
    </div>
  );
};

export { ElementsPanel };
