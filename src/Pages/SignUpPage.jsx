import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      const { username, email, password } = data;
      const result = await registerUser({ username, email, password });

      localStorage.setItem("token", result.user.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/");
      window.location.reload();
    } catch (error) {
      const apiError = error?.errors;
      if (apiError) {
        Object.entries(apiError).forEach(([field, messages]) => {
          const message = Array.isArray(messages)
            ? messages.join(", ")
            : String(messages);

          if (field === "email") {
            setError("email", { type: "server", message });
          } else if (field === "username") {
            setError("username", { type: "server", message });
          } else if (field === "password") {
            setError("password", { type: "server", message });
          } else {
            setServerError(message);
          }
        });
      } else {
        setServerError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Username must be at most 20 characters",
            },
          })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+.\S+$/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 40,
              message: "Password must be at most 40 characters",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <input
          type="password"
          placeholder="Repeat Password"
          {...register("repeatPassword", {
            required: "Please repeat your password",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
          })}
        />
        {errors.repeatPassword && (
          <p className="error">{errors.repeatPassword.message}</p>
        )}

        <label className="checkbox-row">
          <input
            type="checkbox"
            {...register("agree", {
              required: "You must agree to personal data processing",
            })}
          />
          <span>I agree to the processing of my personal data</span>
        </label>
        {errors.agree && <p className="error">{errors.agree.message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
