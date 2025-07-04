import React, { useState } from 'react';

const ApplicationPanel: React.FC = () => {
  const [explanation, setExplanation] = useState(
    `<strong>어플리케이션 패널</strong>은 <strong>스토리지</strong>, <strong>쿠키</strong>, <strong>캐시</strong> 등 웹 브라우저에 저장된 데이터를 확인하고 관리할 수 있는 곳입니다.<br/><br/>
    <ul>
      <li>로컬스토리지/세션스토리지 값 추가 및 삭제</li>
      <li>쿠키 값 확인 및 수정</li>
      <li>서비스 워커, 캐시 스토리지 확인</li>
    </ul>
    <span class="example">예시: 로컬스토리지에 값을 추가하고, 쿠키를 수정해보세요.</span>`
  );

  return (
    <div className="panel-content">
      <div className="panel-section">
        <h3>어플리케이션 패널 학습</h3>
        <div className="explanation" dangerouslySetInnerHTML={{ __html: explanation }} />
      </div>
    </div>
  );
};

export { ApplicationPanel }; 