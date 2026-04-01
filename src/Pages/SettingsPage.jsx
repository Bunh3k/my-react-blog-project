import { useForm } from "react-hook-form";
import { getCurrentUser, updateUser } from "../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const data = await getCurrentUser(token);
      const user = data.user;

      setValue("username", user.username);
      setValue("email", user.email);
      setValue("bio", user.bio || "");
      setValue("image", user.image || "");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (formData) => {
    clearErrors();
    const token = localStorage.getItem("token");

    const userData = {
      username: formData.username,
      email: formData.email,
    };

    if (formData.password) userData.password = formData.password;
    if (formData.bio) userData.bio = formData.bio;
    if (formData.image) userData.image = formData.image;

    try {
      const res = await updateUser(token, userData);

      localStorage.setItem("user", JSON.stringify(res.user));

      alert("Profile updated!");
      window.location.reload();
    } catch (error) {
      const apiErrors = error?.errors;

      if (!apiErrors) return;

      Object.entries(apiErrors).forEach(([field, messages]) => {
        let message = Array.isArray(messages) ? messages[0] : String(messages);

        if (message.includes("username")) {
          message = "Username already taken";
        }

        if (field === "body") {
          setError("username", { type: "server", message });
        }

        if (field === "email") {
          setError("email", { type: "server", message });
        }

        if (field === "password") {
          setError("password", { type: "server", message });
        }
      });
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="settings-page">
      <h1>Your Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <input
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
            onChange: () => clearErrors("username"),
          })}
        />
        {errors.username && <p className="error">{errors.username?.message}</p>}

        {/* Email */}
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email",
            },
            onChange: () => clearErrors("email"),
          })}
        />
        {errors.email && <p className="error">{errors.email?.message}</p>}

        {/* Bio */}
        <textarea
          placeholder="Bio"
          {...register("bio", {
            onChange: () => clearErrors("bio"),
          })}
        />

        {/* Image */}
        <input
          placeholder="Image Avatar URL"
          {...register("image", {
            pattern: {
              value: /^https?:\/\/.+$/,
              message: "Invalid URL",
            },
            onChange: () => clearErrors("image"),
          })}
        />
        {errors.image && <p className="error">{errors.image?.message}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="New Password"
          {...register("password", {
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 40,
              message: "Password must be at most 40 characters",
            },
            onChange: () => clearErrors("password"),
          })}
        />
        {errors.password && <p className="error">{errors.password?.message}</p>}

        <button type="submit">Update Settings</button>
      </form>

      <button type="button" onClick={handleLogout} className="logout-btn">
        Or click here to logout
      </button>
    </div>
  );
}
