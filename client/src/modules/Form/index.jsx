import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";


const Form = ({ isSigninPage = false }) => {
  const [data, setData] = useState({
    ...(!isSigninPage && {
      fullName: "",
    }),
    email: "",
    password: "",
    
  });
  const navigate = useNavigate();
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

      <form className="w-full flex flex-col items-center" onSubmit={()=>console.log("submit")}>
        {!isSigninPage && (
          <Input
            label="Full name"
            name="name"
            placeholder="Enter Your Name"
            className="mb-6 w-1/2"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
        )}
        <Input
          label="Email address"
          name="email"
          placeholder="Enter Your Email"
          type="email"
          isRequired="true"
          className="mb-6 w-1/2"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <Input
          label="Password"
          name="password"
          placeholder="Enter Your Password"
          type="password"
          isRequired="true"
          className="mb-14 w-1/2"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <Button
          label={isSigninPage ? "Sign in" : "Sign up"}
          type="submit"
          className="w-1/2 mb-2"
        />
      </form>

      <div>
        {isSigninPage ? "Didnt have an account?" : "Already have an account?"}
        <span className="text-primary cursor-pointer underline" onClick={()=>navigate(`/users/${isSigninPage?'sign_up':'sign_in'}`)}>
          {isSigninPage ? "Sign up" : "Sign in"}
        </span>
      </div>
    </div>
   </div>
  );
};

export default Form;
