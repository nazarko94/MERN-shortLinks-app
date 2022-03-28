import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { AuthContext } from "../../context/AuthContext";
import "./AuthPage.css";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  // return (
  //   <div className="row">
  //     <div className="col s6 offset-s3">
  //       <h1>Short Link</h1>
  //       <div className="card blue darken-1">
  //         <div className="card-content white-text">
  //           <span className="card-title">Authorization</span>
  //           <div>
  //             <div className="input-field">
  //               <input
  //                 placeholder="Введите email"
  //                 id="email"
  //                 type="text"
  //                 name="email"
  //                 className="yellow-input"
  //                 value={form.email}
  //                 onChange={changeHandler}
  //               />
  //               <label htmlFor="email">Email</label>
  //             </div>

  //             <div className="input-field">
  //               <input
  //                 placeholder="Введите пароль"
  //                 id="password"
  //                 type="password"
  //                 name="password"
  //                 className="yellow-input"
  //                 value={form.password}
  //                 onChange={changeHandler}
  //               />
  //               <label htmlFor="email">Password</label>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="card-action">
  //           <button
  //             className="btn yellow darken-4"
  //             style={{ marginRight: 10 }}
  //             disabled={loading}
  //             onClick={loginHandler}
  //           >
  //             Sign in
  //           </button>
  //           <button
  //             className="btn grey lighten-1 black-text"
  //             onClick={registerHandler}
  //             disabled={loading}
  //           >
  //             Sign up
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="login-form">
      <div className="form">
        <h1>Login</h1>
        <div className="content">
          <div className="input-field">
            <input
              placeholder="Email"
              id="email"
              type="text"
              name="email"
              className="field"
              onChange={changeHandler}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              className="field"
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="action">
          <button
            className="btn-left"
            onClick={loginHandler}
            disabled={loading}
          >
            Sign in
          </button>
          <button
            className="btn-right"
            onClick={registerHandler}
            disabled={loading}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
