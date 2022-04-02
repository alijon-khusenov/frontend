import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import { ARTICLE } from '../urls'
import { COMMENT, COMMENTS_OF_ARTICLE } from '../urls'

export default function ArticleDetail() {
    const [user] = useState(JSON.parse(localStorage.getItem('user' || '[]')))
    const params = useParams()
    const [article, setArticle] = useState()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get(ARTICLE.replace('id', params.id))
            .then(res => setArticle(res.data.data))
            .catch(err => console.error(err))
        loadComments()
    }, [])

    async function addComment(event) {
        event.preventDefault();

        if (comment) {
            await axios.post(COMMENT, {
                data: {
                    article: article.id,
                    user: user.id,
                    body: comment,
                }
            })
                .then(() => {
                    setComment('')
                    loadComments()
                })
                .catch(err => console.error(err))
        } else {
            alert('Write your comment🤦‍♂️!')
        }
    }

    const loadComments = () => {
        axios.get(COMMENTS_OF_ARTICLE.replace('articleId', params.id))
            .then(res => setComments(res.data.data))
            .catch(err => console.error(err))
    }

    console.log(comments);
    return (
        <div>
            {article && (
                <div className="box m-4">
                    <Link to='/'>
                        <button className="button is-danger m-5">Back to main page</button>
                    </Link>
                    <div className="title has-text-dark has-text-centered">
                        {article.attributes.title}
                    </div>
                    <img src={`http://localhost:1337${article.attributes.thumb.data.attributes.url}`} alt="" className="image is-centered" />
                    <div className="subtitle has-text-dark has-text-centered is-italic mt-4">
                        {article.attributes.text}
                    </div>
                    <div className="has-text-right">
                        <span class="tag is-info is-medium">{article.attributes.category.data.attributes.title}</span>
                    </div>
                    {article.attributes.comments.data ? (
                        <div className="title has-text-centered is-3 mb-6">Comments</div>
                    ) : (
                        <div className="has-text-centered has-text-grey-light is-5 mx-3">
                            No comments yet. Be first to leave...
                        </div>
                    )}
                    <div className="has-text-grey is-size-6 has-text-right is-italic">
                        <p className="datetime">Date of publication: {article.attributes.updatedAt}</p>
                        {article.attributes.author.data.attributes.username === user.username ? (
                            <p className="content">Published by you</p>
                        ) : (
                            <p className="content">Published by: {article.attributes.author.data.attributes.username}</p>
                        )}
                    </div>
                    <form className="form" onSubmit={event => addComment(event)}>
                        <input
                            type="text"
                            className="input"
                            placeholder="Leave your comment here!!!"
                            style={{ fontSize: '20px' }}
                            onInput={event => setComment(event.target.value)}
                            value={comment}
                        />
                        <button className="button mt-2 is-fullwidth is-success">Submit</button>
                    </form>
                    <div className="columns is-multiline is-centered mt-2">
                        {comments && comments.map(comment => (
                            <div className="column is-6">
                                <article class="message is-link" key={comment.id}>
                                    <div class="message-header">
                                        <p>{comment.attributes.user.data.attributes.username}</p>
                                        <button className="button"><ion-icon name="trash-outline"></ion-icon></button>
                                    </div>
                                    <div class="message-body">
                                        <div class="subtitle">
                                            {comment.attributes.body}
                                        </div>
                                        <p className="datetime has-text-grey mt-5 has-text-right">{comment.attributes.createdAt}</p>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}