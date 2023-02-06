// Copyright 2023 Paion Data. All rights reserved.
import React from "react";

import styles from "./Login.module.css";
import logo from "...";

interface LoginProps {
  backgroundUrl: string;
  logoUrl: string;
  appName: string;
}

Login.defaultProps = {
  backgroundUrl: ''
  logoUrl: ''
  appName: ''
};

const Login = (props: LoginProps): JSX.Element => {
  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.email.value);

    if (!e.target.email.value) {
      alert("Email is required");
    } else if (!e.target.email.value) {
      alert("Valid email is required");
    } else if (!e.target.password.value) {
      alert("Password is required");
    } else if (
      e.target.email.value === "me@example.com" &&
      e.target.password.value === "123456"
    ) {
      alert("Successfully logged in");
      e.target.email.value = "";
      e.target.password.value = "";
    } else {
      alert("Wrong email or password combination");
    }
  };

  handleClick = e => {
    e.preventDefault();

    alert("Goes to registration page");
  };

 return (
  <div className={styles.login} style={{backgroundImage: 'url(' + props.backgroundUrl + ')'}}>
    <div className={styles.login_sd}>
      <div className={[styles.d_flex, styles.mb_5].join(" ")}>
        <div className={styles.login_logo}>
          <img src={props.logoUrl} alt="App Logo" />
        </div>
        <div className={styles.login_title}>
          <div className={[styles.text_h6, styles.grey__text, styles.text__darken_4].join(" ")}>{props.appName}</div>
        </div>
      </div>

      <div className="App">
        <img src={logo} className={styles.logo} alt="App Logo" />
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="email@example.com" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          <button className="primary">Login</button>
        </form>
        <button className="secondary" onClick={this.handleClick}>
          Register
        </button>
      </div>
    </div>
  </div>
 );
};

export default Login;
