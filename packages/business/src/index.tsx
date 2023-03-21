import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom/client';

// import { sum } from '@liuxuanjs/example-pkg-basic';

import { App } from './app';
import './index.scss';
import reportWebVitals from './report-web-vitals';

// console.log('1 + 1 =', sum(1, 1));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// 如果你想在你的应用程序中开始测量性能，请传递一个函数
// 来记录结果（例如：reportWebVitals(console.log)）。
// 或发送到分析端点。了解更多：https://bit.ly/CRA-vitals
reportWebVitals();
