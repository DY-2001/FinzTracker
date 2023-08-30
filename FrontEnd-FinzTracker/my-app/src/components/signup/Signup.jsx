import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSignup = async () => {
    if (email.current.value && password.current.value) {
      const res = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.current.value, password: password.current.value }),
      });
      const data = await res.json();
      
      if (data.success) {
        navigate("/login");
      } else {
        alert(data.message);
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
          <h2>Sign Up</h2>
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
          <input
            label="confirm-Password"
            type="password"
            placeholder="Confirm-Password"
            ref={confirmPassword}
            style={textInputStyle}
          />
        </div>
        <div className={styles.buttonLogin}>
          <Button variant="contained" onClick={handleSignup}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
