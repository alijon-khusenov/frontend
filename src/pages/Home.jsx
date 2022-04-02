import axios from "axios";
import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { ARTICLES, CATEGORIES } from "../urls";
import Articles from "../components/Articles";


export default function Home() {
    const isAuthenticated = localStorage.getItem("user") && localStorage.getItem("token")
    const [articles, setArticles] = useState()
    

    useEffect(() => load(), [])


    const load = () => {
        axios.get(ARTICLES)
            .then(res => {
                setArticles(res.data.data)
                console.log(res.data.data)
            })
            .catch(err => console.log(err))
    }

    

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    return (
        <Layout articles={articles} setArticles={setArticles} load={load}>
            <Articles articles={articles}/>
        </Layout>
    )
}