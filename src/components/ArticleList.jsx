import { useLoaderData } from "react-router-dom";
import ArticleItem from "./ArticleItem";

export default function ArticleList({ articles }){
    

    return(
        <div className="article-list">
            {articles.map((article) => (
                <ArticleItem key={article.slug} article={article}/>
            ))}
        </div>
    )
}