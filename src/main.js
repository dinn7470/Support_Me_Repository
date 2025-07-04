import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "./context/AuthContext";
const client = new QueryClient();
const root = createRoot(document.getElementById('root'));
root.render(_jsx(React.StrictMode, { children: _jsx(QueryClientProvider, { client: client, children: _jsx(AuthProvider, { children: _jsx(Router, { children: _jsx(App, {}) }) }) }) }));
