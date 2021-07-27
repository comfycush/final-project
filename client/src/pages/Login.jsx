import React, { useState } from "react";
import "../styles/login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    axios({
      url: "http://localhost:4000/login",
      method: "POST",
      data: {
        email,
        password,
      },
    })
      .then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("email", data.email);
        setEmail("");
        setPassword("");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLogin = async (googleData) => {
    const res = await fetch("http://localhost:4000/googleLogin", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("email", data.email);
      history.push("/dashboard");
    }
  };

  return (
    <React.Fragment>
      <div className="flex items-center min-h-screen">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div
              onClick={() => history.push("/")}
              className="cursor-pointer text-center"
            >
              <img
                src="https://ik.imagekit.io/vrvrzbdh5xfk/logo_trans_Rh6ERWv_H.png?updatedAt=1627302901317"
                className="my-3 ml-16 max-w-xs"
                alt="logo"
              />
            </div>
            <div className="m-7">
              <form onSubmit={handleSubmit} action>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                <div style={{ marginTop: 20, marginLeft: 110 }}>
                  <GoogleLogin
                    clientId={
                      "1035521074618-nkotpceb3p60muu0h5rmf6hn5pe72dtc.apps.googleusercontent.com"
                    }
                    buttonText="Log in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <p className="text-sm text-center text-gray-400">
                  Don't have an account yet?{" "}
                  <a
                    onClick={() => history.push("/register")}
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                  >
                    Sign up
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-homepage">
        <h2>
          web<span>ber</span>
        </h2>
        <h4>Copyright 2021 || Web Builder</h4>
      </div>
    </React.Fragment>
  );
}
