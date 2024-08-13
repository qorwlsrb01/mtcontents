import React, { createContext, useContext, ReactNode } from 'react';

// 한글 초성 리스트
const CHOSUNG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// 특정 문자에 대한 초성을 반환하는 함수
const getChosung = (char: string): string => {
  const code = char.charCodeAt(0) - 0xAC00;
  if (char === ' ') {
    return ''; // 공백은 그대로 반환
  }
  if (code >= 0 && code < 11172) {
    // 한글 초성 반환
    return CHOSUNG_LIST[Math.floor(code / 588)];
  }
  // 그 외의 문자는 'O' 반환
  return 'O';
};
// 특정 문자에 대한 초성을 반환하는 함수
const getChosung2 = (char: string): string => {
  const code = char.charCodeAt(0) - 0xAC00;
  if (char === ' ') {
    return ' '; // 공백은 그대로 반환
  }
  if (code >= 0 && code < 11172) {
    // 한글 초성 반환
    return CHOSUNG_LIST[Math.floor(code / 588)];
  }
  // 그 외의 문자는 'O' 반환
  return 'O';
};

// 문자열의 첫 글자만 추출하는 함수
const getInitials = (text: string): string => {
  return text.split('')[0] || '';
};

// 문자열의 초성만 추출하는 함수
const getChosungList = (text: string): string => {
  return text.split('').map(char => getChosung(char)).join('');
};

// 문자열의 초성과 띄어쓰기를 반영하여 초성 리스트를 반환하는 함수
const getChosungListWithSpaces = (text: string): string => {
  if (!text) return ''; // 빈 문자열일 경우 빈 문자열 반환

  const firstChar = getInitials(text); // 첫 글자를 가져옴
  const remainingChars = text.slice(1); // 첫 글자를 제외한 나머지 문자들

  const chosungWithSpaces = remainingChars.split('').map(char => {
    if (char === ' ') return ' '; // 띄어쓰기는 그대로 유지
    return getChosung2(char);
  }).join('');

  return firstChar + chosungWithSpaces;
};

// QuizContext의 형태를 정의하는 타입
interface QuizData {
  첫글자: string[];
  초성: string[];
  띄어쓰기: string[];
  정답: string[];
}

interface QuizContextType {
  buttonNames: string[];
  data: {
    [key: string]: QuizData;
  };
}

// QuizContext 생성
const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const buttonNames = [
    "정연권Best", "백진규Best", "이진욱Best","조성현Best", "배상준Best", "이용준Best", "정연권Worst", "백진규Worst","이진욱Worst","조성현Worst"
  ];

  // 정답 리스트로부터 자동으로 첫글자, 초성, 띄어쓰기 포함 초성을 생성하는 함수
  const generateData = (answers: string[]): QuizData => {
    return {
      초성: answers.map(getChosungList),
      첫글자: answers.map(getInitials),
      띄어쓰기: answers.map(getChosungListWithSpaces),
      정답: answers
    };
  };

  const data: { [key: string]: QuizData } = {
    정연권Best: generateData([
      "강철의연금술사 브라더후드","오드택시","86 에이티식스","시로바코","천국대마경","러키☆스타","장송의 프리렌","충사","사이버펑크 엣지러너","철야의 노래"
    ]),
    정연권Worst: generateData([
      "공전 마도사 후보생의 교관","폭식의 베르세르크","단간론파 3 The end of 키보가미네 학원","데스 퍼레이드","샤를로트","마요이가","나만 들어가는 숨겨진 던전","소꿉친구가 절대로 지지 않는 러브코미디","무능한 나나","노 게임 노 라이프"
    ]),
    배상준Best: generateData([
      "작은 눈의 요정 슈가","신기동전기 건담 W","이나즈마 일레븐","엘리먼트 헌터","원피스","케이온","돌격 빠빠라대","RWBY","러브라이브","체포하겠어"
    ]),
    이용준Best: generateData([
      "강철의 연금술사","빙과","타마코마켓","시로바코","붉은돼지","돌아가는 펭귄드럼","나만이 없는 거리","그래도 마을은 돌아간다","신세기 에반게리온","바이올렛 에버가든"
    ]),
    조성현Best: generateData([
      "강철의 연금술사","에이티식스","데스노트","울려라 유포니엄","무직전생","장송의 프리렌","오드택시","사이버펑크 엣지러너","토라도라","시로바코"
    ]),
    조성현Worst: generateData([
      "공전마도사 후보생의 교관","레일워즈","샤를로트","여친 빌리겠습니다","녹을 먹는 비스코","소녀전선"
    ]),
    이진욱Best: generateData([
      "기동전사 건담 더블오","THE IDOLM@STER","최애의 아이","학교생활!","K-ON!","하이큐!","바라카몬","너와 나","타리타리","빙과"
    ]),
    이진욱Worst: generateData([
      "비탄의 아리아","토가이누의 피","야한 이야기라는 개념이 존재하지 않는 지루한 세계","개와 가위는 쓰기 나름","진지하게 날 사랑해","레드 데이터 ","백화요란 사무라이 브라이드","그 여름에서 기다릴께","비비드레드 오퍼레이션","내가 인기없는 건 아무리 생각해도 너희들이 나빠!"
    ]),
    백진규Best: generateData([
      "리라이프","하트 커넥트","학생회의 일존","칼 이야기","은수저","액셀 월드","사쿠라장의 애완 그녀","키노의 여행","단칸방의 침략자","피아노의 숲"
    ]),
    백진규Worst: generateData([
      "네가 있는 마을","헬싱","유녀전기","미카구라 학원 조곡","기교소녀는 상처받지 않아","5등분의 신부","앤젤 비츠","주문은 토끼입니까","저 트윈테일이 됩니다","정령사의 검무"
    ]),
    // 다른 사람들의 데이터도 여기에 추가
  };

  return (
    <QuizContext.Provider value={{ buttonNames, data }}>
      {children}
    </QuizContext.Provider>
  );
};

// QuizContext를 사용하는 함수형 컴포넌트에서 사용하는 훅
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
