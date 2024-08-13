"use client";

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import dynamic from 'next/dynamic';
import { QuizProvider } from './QuizContext'; // Import the QuizProvider

// QuizPage 컴포넌트를 클라이언트 사이드에서만 렌더링되도록 dynamic import
const QuizPage = dynamic(() => import('./quizPage'), { ssr: false });

const buttonNames = [
  "정연권Best", "백진규Best", "이진욱Best", "조성현Best", "배상준Best", "이용준Best",
  "정연권Worst", "백진규Worst", "이진욱Worst", "조성현Worst"
];

function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // 클라이언트 사이드에서만 렌더링
  }

  return (
    <QuizProvider>
      <Router>
        <div className="App" style={styles.app}>
          <h1 style={styles.header}>애니메이션 맞추기</h1>
          <div style={styles.buttonsContainer}>
            <div style={styles.buttonRow}>
              {buttonNames.slice(0, 6).map((name, index) => (
                <Link key={index} to={`/quiz/${index + 1}`}>
                  <button style={styles.button}>{name}</button>
                </Link>
              ))}
            </div>
            <div style={styles.buttonRow}>
              {buttonNames.slice(6).map((name, index) => (
                <Link key={index + 6} to={`/quiz/${index + 7}`}>
                  <button style={styles.button}>{name}</button>
                </Link>
              ))}
            </div>
          </div>
          <Routes>
            <Route path="/quiz/:buttonId" element={<QuizPage />} />
          </Routes>
        </div>
      </Router>
    </QuizProvider>
  );
}

const styles = {
  app: {
    textAlign: 'center' as const, // 'center'를 문자열 리터럴로 지정
    padding: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column' as const, // 'column'을 문자열 리터럴로 지정
    alignItems: 'center' as const, // 'center'를 문자열 리터럴로 지정
    gap: '10px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center' as const, // 'center'를 문자열 리터럴로 지정
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default App;
