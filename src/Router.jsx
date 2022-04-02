import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateArticle from './pages/CreateArticle';
import ArticleDetail from "./pages/ArticleDetail";
import './static/bulma.css'
import './static/style.css'             

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/login" element={<Login/>} exact />
                <Route path="/register" element={<Register/>} exact />
                <Route path="/createArticle" element={<CreateArticle />} exact />
                <Route path="/article/:id" element={<ArticleDetail />} exact />
            </Routes>
        </BrowserRouter>
    );
}
