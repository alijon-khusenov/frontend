import React from 'react';
import { Link } from 'react-router-dom';

export default function Article({ article }) {
    console.log(article.attributes)
    return (
        <div className="card article-card">
            <div className="card-image">
                <Link to={`/article/${article.id}`}>
                    <figure className="image is-4by3">
                        <img src={`http://localhost:1337${article.attributes.thumb.data.attributes.url}`} alt="Placeholder image" />
                    </figure>
                </Link>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content ">
                        <p className="title has-text-black is-4">{article.attributes.title}</p>
                        <p className="subtitle has-text-black is-6">Author: <span className="is-italic has-text-weight-bold">{article.attributes.author.data.attributes.username}</span></p>
                        <span class="tag is-info is-centered">{article.attributes.category.data.attributes.title}</span>
                    </div>
                </div>

                <div className="content has-text-black">
                    {article.attributes.text}
                    {/* <p>{article.attributes.category}</p> */}
                </div>
            </div>
        </div>
    )
}