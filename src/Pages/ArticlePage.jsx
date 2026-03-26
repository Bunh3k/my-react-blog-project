import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../services/api";
import { ArticleBanner } from "../components/Banner";
import UserInfo from "../components/UserInfo";
import ReactMarkdown from 'react-markdown';
import Loading from "../components/Loading";

export default function ArticlePage(){
    const { slug } = useParams()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchArticle() {
            try{
                setLoading(true)
                setError("")
                const data = await getArticle(slug)
                setArticle(data.article)
            } catch(error){
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchArticle()
    },[slug])

    return(
        <div className="article-page">

            {loading && <Loading/>}
            {error && <p className="status-text">{error}</p>}

            {!loading && article && (
                <>
                    <ArticleBanner article={article}/>
                    <div className="article-banner-body">
                       <div className="article-body">
                         <ReactMarkdown>{article.body}</ReactMarkdown>
                       </div>
                        <div className="tagbar">
                            {article.tagList.map((tag) => (
                                <span className="tag-pills" key={tag}>{tag}</span>
                            ))}
                        </div>
                        <div className="banner-footer">
                            <UserInfo article={article}/>
                            <button className="favorite-article">Favorite article</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}