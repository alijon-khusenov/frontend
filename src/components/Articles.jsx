import React from 'react';
import Article from './Article'

export default function Articles({articles, setArticles}) {
    return(
        <div className="columns is-multiline is-centered">
            {articles && articles.map(article => (
                <div key={article.id} className="column is-4">
                    <Article article={article}/>
                </div>
            ))}
        </div>
    )
}