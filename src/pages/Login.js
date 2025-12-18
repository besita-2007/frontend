import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; 
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  
  const {
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm();

  const onSubmit = (data) => {
    alert(`User Login Success for ${data.email}!`);
    navigate("/searchbus");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <input 
            type="email" 
            placeholder="Email" 
            className="login-input"
            {...register("email", { 
              required: "Email is required", 
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}

          <input 
            type="password" 
            placeholder="Password" 
            className="login-input"
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
          
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;