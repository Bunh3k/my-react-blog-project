import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../services/api";
import { useEffect } from "react";

export default function NewArticlePlage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("sign-in");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const res = await createArticle(token, data);
      navigate(`/articles/${res.article.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new-article-page">
      <h1>Create New Article</h1>
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

        <button type="submit">Publish Article</button>
      </form>
    </div>
  );
}
