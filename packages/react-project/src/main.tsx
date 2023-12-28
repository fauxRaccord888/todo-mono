// import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// StrictMode에서 dispatch가 2번 호출되는 문제로 StrictMode를 해제
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
