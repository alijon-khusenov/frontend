import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { CATEGORIES, ARTICLES } from "../urls";
import axios from 'axios';

export default function Layout({ children, setArticles, load }) {
    const navigate = useNavigate()
    const [user] = useState(JSON.parse(localStorage.getItem('user') || '[]'))
    const [categories, setCategories] = useState()
    const [value, setValue] = useState('')


    useEffect(() => {
        axios.get(CATEGORIES)
            .then(res => setCategories(res.data.data))
            .catch(err => console.error(err))
    }, [])

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login')
    }

    const filter = filters => {
        axios.get(ARTICLES + `&filters[${filters.key}][title][$eq]=${filters.value}`)
            .then(res => setArticles(res.data.data))
            .catch(err => console.error(err))
    }

    const search = value => {
        axios.get(ARTICLES + `&filters[title][$containsi]=${value}`)
            .then(res => setArticles(res.data.data))
            .catch(err => console.error(err))
    }

    return (
        <section className="hero is-info is-fullheight">
            <div className="hero-head">
                <header className="navbar">
                    <div className="container">
                        <div className="navbar-brand">
                            <a className="navbar-item">
                                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
                            </a>
                            <span className="navbar-burger" data-target="navbarMenuHeroC">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                        <div className="navbar-start">
                            <span class="navbar-item" >
                                <Link to="createArticle">
                                    <button href="" class="button is-info is-outlined is-inverted">
                                        <span class="mr-2 mt-1">
                                            <ion-icon name="book-outline"></ion-icon>
                                        </span>
                                        Создать пост
                                    </button>
                                </Link>
                            </span>
                            <span className="navbar-item">
                                <button className='button' onClick={load}>Все посты</button>
                            </span>
                            <span className="navbar-item">
                                <div class="dropdown is-hoverable" >
                                    <div class="dropdown-trigger">
                                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                            <span>Choose category</span>
                                        </button>
                                    </div>
                                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                        <div class="dropdown-content">
                                            {categories && categories.map(category => (
                                                <a className='dropdown-item' onClick={() => filter({ key: 'category', value: category.attributes.title })}>
                                                    {category.attributes.title}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                        <div id="navbarMenuHeroC" className="navbar-menu">
                            <div className="navbar-end">
                                <span className="navbar-item">
                                    <div class="field has-addons">
                                        <div class="control">
                                            <input
                                                class="input"
                                                type="search"
                                                onInput={event => setValue(event.target.value)}
                                                onChange={() => search(value)}
                                                value={value}
                                                placeholder="Find an article " />
                                        </div>
                                        <div class="control">
                                            <a class="button is-success">
                                                Search
                                            </a>
                                        </div>
                                    </div>
                                </span>
                                <a className="navbar-item button my-2 has-text-black">
                                    Welcome: {user && user.username || 'No name'}
                                </a>
                                <div className="navbar-item">
                                    <button className="button is-danger" onClick={logOut}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            <div className="hero-body">
                <div className="container has-text-centered">
                    {children}
                </div>
            </div>
        </section>
    )
}