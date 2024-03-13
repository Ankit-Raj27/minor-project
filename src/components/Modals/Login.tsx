import { auth } from "@/Firebase/firebase";
import { authModalState } from "@/atoms/authModalAtom";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModal = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModal((prev) => ({ ...prev, type }));
  };

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.email || !input.password) return alert("Please fill all fields!");
      try {
        const newUser = await signInWithEmailAndPassword(   
          input.email,
          input.password
          );
        if (!newUser) return;
        router.push("/");
      } catch (error: any) {
        alert("Login error! Check details");
      }
  };
  console.log(user,"user");

  useEffect(()=>{
    alert("Wrong password or email!")
  },[error]);

  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white"> Sign in</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 
            block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@comapny.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 
            block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="*********"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
        bg-brand-orange hover:bg-brand-orange-s"
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <button className="flex w-full justify-end ">
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
          onClick={() => handleClick("forgotPassword")}
        >
          Forgot Password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-300 ">
        Not Registered?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("register")}
        >
          create Account!
        </a>
      </div>
    </form>
  );
};
export default Login;
