import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getArticle, updateArticle } from "../services/api";

export default function EditArticlePage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { slug } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const res = await updateArticle(token, slug, data);
      navigate(`/articles/${res.article.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("sign-in");
  }, [navigate]);

  useEffect(() => {
    async function loadArticle() {
      const data = await getArticle(slug);
      const article = data.article;

      setValue("title", article.title);
      setValue("description", article.description);
      setValue("body", article.body);
    }

    loadArticle();
  }, [slug, setValue]);

  return (
    <div className="edit-article-page">
      <h1>Edit Article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
          })}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <input
          placeholder="Description"
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}

        <textarea
          placeholder="Input your text"
          {...register("body", {
            required: "Body is required",
          })}
        />
        {errors.body && <p className="error">{errors.body.message}</p>}

        <button type="submit">Update Article</button>
      </form>
    </div>
  );
}
