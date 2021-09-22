import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers'; // 結合されたreducerをimport
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const store = createStore(reducer) // Storeを作ってreducer機能を格納！

// AppをStore機能を持ったProviderで包んで、子コンポーネントのどこからでもStore機能を使えるようにしている。
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
