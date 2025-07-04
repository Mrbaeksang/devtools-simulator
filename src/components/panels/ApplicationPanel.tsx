import React, { useState, useRef } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const ApplicationPanel: React.FC = () => {
  const { localStorageItems, addLocalStorageItem, removeLocalStorageItem, clearLocalStorage } = useAppContext();
  const [explanation, setExplanation] = useState(
    `<strong>어플리케이션 패널</strong>은 <strong>스토리지</strong>, <strong>쿠키</strong>, <strong>캐시</strong> 등 웹 브라우저에 저장된 데이터를 확인하고 관리할 수 있는 곳입니다.<br/><br/>
    <ul>
      <li>로컬스토리지/세션스토리지 값 추가 및 삭제</li>
      <li>쿠키 값 확인 및 수정</li>
      <li>서비스 워커, 캐시 스토리지 확인</li>
    </ul>
    <span class="example">아래 입력 필드와 버튼을 사용해 Local Storage 값을 추가, 삭제해보세요.</span>`
  );
  const keyRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (keyRef.current && valueRef.current) {
      const key = keyRef.current.value;
      const value = valueRef.current.value;
      if (key && value) {
        addLocalStorageItem({ key, value });
        keyRef.current.value = '';
        valueRef.current.value = '';
        setExplanation(`'${key}' 키에 값을 추가/수정했습니다.`);
      }
    }
  };

  const handleRemove = (key: string) => {
    removeLocalStorageItem(key);
    setExplanation(`'${key}' 키를 삭제했습니다.`);
  };

  const handleClear = () => {
    clearLocalStorage();
    setExplanation('Local Storage의 모든 항목을 삭제했습니다.');
  };

  return (
    <div className="panel-content">
      <div className="panel-section">
        <h3>Local Storage 시뮬레이션</h3>
        <div className="storage-controls">
          <input ref={keyRef} type="text" placeholder="Key" />
          <input ref={valueRef} type="text" placeholder="Value" />
          <button className="action-button" onClick={handleAdd}>추가/수정</button>
          <button className="action-button clear-button" onClick={handleClear}>전체 삭제</button>
        </div>
        {localStorageItems.length > 0 ? (
          <table className="storage-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {localStorageItems.map(item => (
                <tr key={item.key}>
                  <td>{item.key}</td>
                  <td>{item.value}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleRemove(item.key)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-message">Local Storage가 비어있습니다.</div>
        )}
      </div>
      <div className="panel-section">
        <h3>어플리케이션 패널 학습</h3>
        <div className="explanation" dangerouslySetInnerHTML={{ __html: explanation }} />
      </div>
    </div>
  );
};

export { ApplicationPanel }; 