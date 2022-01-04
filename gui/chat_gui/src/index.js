import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import Login from './Pages/Login';
import Chats from './Pages/Chats';
import Signup from './Pages/Signup';
import NoPage from './Pages/NoPage';
import DirectChat from './Pages/DirectChat';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="signup" element={<Signup></Signup>}></Route>
        <Route path="chats" element={<Chats></Chats>}></Route>
        <Route path="directchat" element={<DirectChat></DirectChat>}></Route>
        <Route path="*" element={<NoPage />} />  {/*ERROR (404)*/}
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);