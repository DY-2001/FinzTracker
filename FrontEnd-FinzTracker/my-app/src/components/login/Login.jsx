import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const handleLogin = async () => {
    if (email.current.value && password.current.value) {
      const user = {
        email: email.current.value,
        password: password.current.value,
      };
      const res = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email.current.value, password: password.current.value }),
      });

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data.user))
      console.log(data);
      if (!data.success) {
        alert(data.message);
      } else {
        navigate("/");
      }
    }
  };

  const textInputStyle = {
    width: "92%",
    marginBottom: "4%",
    marginTop: "2%",
    padding: "13px",
    borderRadius: "4px",
    outline: "none",
    border: "1px solid var(--border-border-subtle, #B9B4C7)",
  };

  return (
    <div className={styles.fullLogin}>
      <div className={styles.loginCart}>
        <div className={styles.headLogin}>
          <h2>Login</h2>
        </div>
        <div className={styles.fieldLogin}>
          <input
            label="Email"
            type="text"
            placeholder="Email"
            ref={email}
            style={textInputStyle}
          />
          <input
            label="Password"
            type="password"
            placeholder="Password"
            ref={password}
            style={textInputStyle}
          />
        </div>
        <div className={styles.buttonLogin}>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
