import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function SingInPage(){
    const { register, handleSubmit, formState: {errors}} = useForm();

    const [serverError, setServerError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async(data) => {
        setServerError("")
        setLoading(true)
        
        try{
            const result = await loginUser(data)

            localStorage.setItem("token", result.user.token);
            localStorage.setItem("user", JSON.stringify(result.user));

            navigate("/")
        } catch(error){
            setServerError(error.message)
        } finally{
            setLoading(false)
        }
    };

    return(
        <div className="sign-in-page">
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="email" 
                    placeholder="Username"
                    {...register("email",
                        {
                            required: "Email is required",
                            pattern: {
                                value: "/^\S+@\S+\.\S+$/",
                                message: "Enter a valid email"
                            }
                        }
                    )}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}


                <input 
                    type="password" 
                    placeholder="Password"
                    {...register("password",
                        {required: "Password is required"}
                    )}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}

                {serverError && <p className="error">{serverError}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    )
}