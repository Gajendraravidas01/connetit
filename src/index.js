import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthcontextProvider } from "./context/authContext";
import { ChatcontextProvider } from './context/ChatsContexts';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthcontextProvider>
    <ChatcontextProvider>
      <Router>
        <App />
      </Router>
    </ChatcontextProvider>
  </AuthcontextProvider>
);


