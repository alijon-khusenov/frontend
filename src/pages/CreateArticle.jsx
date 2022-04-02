import axios from "axios";
import {Link} from "react-router-dom"
import React, { useState, useEffect } from "react";
import { ARTICLES, CATEGORIES } from "../urls"

export default function CreateArticle() {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [thumb, setThumb] = useState(null)
    const [slug, setSlug] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(CATEGORIES)
            .then(res => setCategories(res.data.data))
            .catch(err => console.error(err))
    }, [])

    const createArticle = event => {
        event.preventDefault()

        axios.post(ARTICLES, {
            data: {
                title, text, slug, category
            }
        })
            .then(res => console.log(res.data.data))
            .catch(err => console.error(err))
    }

    return (
        <div className="section">
            <Link to='/'>
                <button className="button is-danger m-5">Back to main page</button>
            </Link>
            <div className="container">
                <div className="columns is-centered mt-6">
                    <div className="column is-5">
                        <div className="box">
                            <div className="title has-text-centered">Creating article</div>
                            <form className='form' onSubmit={event => createArticle(event)}>
                                <label htmlFor="title">Enter title</label>
                                <input
                                    type="text"
                                    id='title'
                                    className='input'
                                    onInput={event => setTitle(event.target.value)}
                                    value={title}
                                />
                                <label htmlFor="text">Enter text</label>
                                <textarea
                                    id='text'
                                    className='textarea'
                                    onInput={event => setText(event.target.value)}
                                    value={text}
                                />
                                <label htmlFor="image">Enter image</label>
                                <div class="file">
                                    <label class="file-label">
                                        <input class="file-input" type="file" name="resume" />
                                        <span class="file-cta">
                                            <span class="file-label">
                                                Choose a file…
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <label htmlFor="slug">Enter slug</label>
                                <input
                                    type="text"
                                    id='slug'
                                    className='input'
                                    onInput={event => setSlug(event.target.value)}
                                    value={slug}
                                />
                                <label htmlFor="category">Category</label>
                                <div class="control">
                                    <div class="select">
                                        <select id="category" onClick={event => setCategory(event.target.value)}>
                                            {categories && categories.map(category => (
                                                <option value={category.id}>
                                                    {category.attributes.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    className="button is-fullwidth is-success my-2"
                                    type='submit'>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}