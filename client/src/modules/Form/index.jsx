import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Form = ({ isSigninPage = false }) => {
  const [data, setData] = useState({
    ...(!isSigninPage && {
      fullName: "",
    }),
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const url = isSigninPage
      ? "http://localhost:8000/auth/login"
      : "http://localhost:8000/auth/register";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (res.status === 400) {
      alert("Invalid credentials");
    } else {
      if (resData.token) {
        localStorage.setItem("user:token", resData.token);
        localStorage.setItem("user:detail",resData.user);
        navigate("/");
      }
    }
  };
  return (
    <div className=" bg-light h-screen flex items-center justify-center">
      <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold">
          Welcome {isSigninPage && "Back"}
        </div>
        <div className="text-xl font-light mb-14">
          {" "}
          {isSigninPage ? " Sign in to get explore" : " Sign up to get started"}
        </div>

        <form
          id={`${isSigninPage ? "loginform" : "registereform"}`}
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          {!isSigninPage && (
            <Input
              label="Full name"
              name="name"
              placeholder="Enter Your Name"
              className="mb-6 w-3/4"
              value={data.fullName}
              id={`${isSigninPage ? "loginfullname" : "registerfullname"}`}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
          )}
          <Input
            label="Email address"
            name="email"
            placeholder="Enter Your Email"
            type="email"
            isRequired={true}
            id={`${isSigninPage ? "loginemail" : "registeremail"}`}
            className="mb-6 w-3/4"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            label="Password"
            name="password"
            placeholder="Enter Your Password"
            id={`${isSigninPage ? "loginpassword" : "registerpassword"}`}
            type="password"
            isRequired={true}
            className="mb-14 w-3/4"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <Button
            label={isSigninPage ? "Sign in" : "Sign up"}
            type="submit"
            className="w-3/4 mb-2"
          />
        </form>

        <div>
          {isSigninPage ? "Didnt have an account?" : "Already have an account?"}
          <span
            className="text-primary cursor-pointer underline"
            onClick={() =>
              navigate(`/users/${isSigninPage ? "sign_up" : "sign_in"}`)
            }
          >
            {isSigninPage ? "Sign up" : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Form;
