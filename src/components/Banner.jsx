import { FaUser } from "react-icons/fa6";

export default function Banner(){
    return(
        <div className="banner">
            <a href='https://react-blog-delta-peach.vercel.app/#'>Realworld Blog</a>
            <span>A place to share your knowledge.</span>
        </div>
    )
}

export function ArticleBanner({article}){
    return(
        <>
        <div className="article-banner">
            <div className="article-banner-container">
                <h2 className="big-article-title">{article.description}</h2>
                <div className="user-info">
                    <FaUser 
                        style={{ 
                            color: "#61BB61", 
                            border: "1px solid #fff",
                            borderRadius: "20px",
                            padding: "4px"
                        }} />
                    <div className="user-description">
                        <span className="user-name">{article.author.username}</span>
                        <span className="user-date">{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}