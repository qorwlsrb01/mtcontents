import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuizContext } from './QuizContext';

function QuizPage() {
  const { buttonId } = useParams();
  const { buttonNames, data } = useQuizContext();
  const buttonIndex = parseInt(buttonId ?? '0', 10) - 1;
  const buttonName = buttonNames[buttonIndex] || '';
  const [selectedTypes, setSelectedTypes] = useState<{ [key: number]: string | null }>({});
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    setSelectedTypes({});
    setInputValue('');
    setMessage('');
  }, [location]);

  const handleButtonClick = (index: number, buttonType: string) => {
    setSelectedTypes(prev => ({
      ...prev,
      [index]: prev[index] === buttonType ? null : buttonType
    }));
  };

  const getNonSpaceCharacterCount = (text: string) => {
    return text.replace(/\s+/g, '').length;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    let found = false;

    Object.keys(data[buttonName]?.정답 || {}).forEach((indexStr) => {
      const index = parseInt(indexStr, 10);
      if (inputValue === data[buttonName]?.정답[index]) {
        setSelectedTypes(prev => ({
          ...prev,
          [index]: '정답'
        }));
        found = true;
      }
    });

    if (found) {
      setMessage(`"${inputValue}" 정답입니다!`);
    } else {
      setMessage('항목에 없습니다!');
    }

    setInputValue(''); // 제출 후 입력창 초기화
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div>
      
      <h1>{buttonName}</h1>
      <div className="quiz-container">
        {[...Array(10)].map((_, index) => (
          <div className="question-block" key={index}>
            <div className="placeholder">
              {selectedTypes[index] ? (
                <p>
                  {selectedTypes[index]}: {data[buttonName]?.[selectedTypes[index] as keyof typeof data[typeof buttonName]]?.[index] || '데이터 없음'}
                </p>
              ) : (
                <p>정답 글자 수: {getNonSpaceCharacterCount(data[buttonName]?.정답[index] || '')}</p>
              )}
            </div>
            <div className="buttons">
              <button onClick={() => handleButtonClick(index, '초성')}>초성</button>
              <button onClick={() => handleButtonClick(index, '첫글자')}>첫글자</button>
              <button onClick={() => handleButtonClick(index, '띄어쓰기')}>띄어쓰기</button>
              <button onClick={() => handleButtonClick(index, '정답')}>정답</button>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="정답 입력"
        />
        <button onClick={handleSubmit}>제출</button>
      </div>
      {message && <p className="message">{message}</p>}
      <style jsx>{`
        .quiz-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .question-block {
          flex: 0 0 calc(20% - 10px);
          box-sizing: border-box;
          border: 1px solid #ddd;
          padding: 10px;
          display: flex;
          flex-direction: column;
        }
        .placeholder {
          flex: 1;
          min-height: 100px;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          border: 1px solid #ddd;
        }
        .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .buttons button {
          flex: 1;
          margin: 0 5px;
        }
        .input-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .input-container input {
          flex: 0 1 300px;
          padding: 5px;
          font-size: 16px;
        }
        .input-container button {
          padding: 5px 10px;
          margin-left: 10px;
        }
        .message {
          margin-top: 20px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default QuizPage;
