import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const WebsitePreview: React.FC = () => {
  const { cardState } = useAppContext();

  return (
    <div className="website-preview">
      <header className="preview-header">
        <h2>웹사이트 미리보기</h2>
        <p>아래 카드는 DevTools에서 조작할 수 있는 요소입니다.</p>
      </header>
      <div className="preview-content">
        <div 
          id="interactive-card" 
          className={cardState.className}
          style={cardState.style}
        >
          {cardState.text}
        </div>
        <div className="preview-instructions">
          <p>오른쪽 DevTools 패널의 버튼을 눌러 이 요소를 조작하고 디버깅 실습을 해보세요.</p>
        </div>
      </div>
    </div>
  );
};

export default WebsitePreview;
