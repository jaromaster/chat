import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/Login';
import Chats from './Pages/Chats';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="chats" element={<Chats></Chats>}></Route>
        {/* <Route path="*" element={<NoPage />} />  ERROR (404)*/}
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
