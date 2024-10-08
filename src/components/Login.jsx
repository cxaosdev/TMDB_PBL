import React, { useState } from "react";
import NavBar from "./NavBar";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { handleGoogleSignIn, handleKakaoSignIn } from "./Signup";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const inputClass =
    "w-full p-4 text-white transition duration-300 bg-black border border-zinc-400 rounded focus:border-amber-400 focus:outline-none focus:text-amber-400";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("로그인 실패: " + error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-[400px] mt-20">
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="relative mb-6 text-gray-500 focus-within:text-amber-400">
              <label className="block mb-2 text-sm" htmlFor="email">
                이메일
              </label>
              <input
                type="email"
                id="email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 입력"
                autoComplete="off"
              />
            </div>
            <div className="relative mb-6 text-gray-500 focus-within:text-amber-400">
              <label className="block mb-2 text-sm" htmlFor="password">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 font-bold text-white transition duration-300 rounded bg-amber-500 hover:bg-amber-600"
            >
              Log In
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="cursor-pointer flex items-center justify-center w-full p-1 mt-4 text-black font-bold transition duration-300 bg-[#F2F2F2] rounded hover:bg-zinc-400"
            >
              <img className="h-[40px]" src="/src/assets/pngwing.com.png" />
              Continue with Google
            </button>
            <button
              onClick={handleKakaoSignIn}
              className="h-[50px] cursor-pointer flex items-center justify-center w-full p-1 mt-4 text-black font-bold transition duration-300 bg-[#FEE500] rounded hover:bg-zinc-400"
            >
              <img
                className="h-[20px] mr-[10px] text-[#191919]"
                src="/src/assets/kakao.png"
              />
              Continue with Kakao
            </button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <div className="w-[250px] h-[1px] bg-gray-400"></div>
          </div>
          <p className="mt-4 text-sm text-center text-gray-400">
            아직 계정이 없으신가요?{" "}
            <a href="/Signup" className="text-amber-400">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
