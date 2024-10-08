import React, { useState } from "react";
import { FaCalendarAlt, FaGoogle } from "react-icons/fa";
import NavBar from "./NavBar";
import { supabase } from "../supabaseClient";

export const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    setError(error.message);
  }
};

export const handleKakaoSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
  });
  if (error) {
    setError(error.message);
  }
};

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError("유효하지 않은 이메일입니다!");
    }
    if (password.length < 6) {
      return setError("비밀번호는 6자리 이상이어야 합니다!");
    }
    if (password !== confirmPassword) {
      return setError("비밀번호가 일치하지 않습니다!");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("회원가입이 완료되었습니다.");
    }
  };

  const inputClass =
    "w-full p-3 text-white transition duration-300 bg-black border border-zinc-400 rounded focus:border-amber-400 focus:outline-none focus:text-amber-400";

  return (
    <div className="min-h-screen bg-zinc-900">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen pt-8 pb-8">
        <div className="w-[400px] mt-20">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <form onSubmit={handleSignUp}>
            <div className="relative mb-6 text-gray-500 focus-within:text-amber-400">
              <label className="block mb-2 text-sm" htmlFor="name">
                이름
              </label>
              <input
                type="text"
                id="name"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름 입력"
                autoComplete="off"
              />
            </div>

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

            <div className="relative mb-6 text-gray-500 focus-within:text-amber-400">
              <label className="block mb-2 text-sm" htmlFor="confirmPassword">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={inputClass}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-3 font-bold text-white transition duration-300 rounded bg-amber-500 hover:bg-amber-600"
            >
              Sign up
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="h-[50px] cursor-pointer flex items-center justify-center w-full p-1 mt-4 text-black font-bold transition duration-300 bg-[#F2F2F2] rounded hover:bg-zinc-400"
          >
            <img className="h-[40px]" src="/public/assets/pngwing.com.png" />
            Sign up with Google
          </button>

          <button
            onClick={handleKakaoSignIn}
            className="h-[50px] cursor-pointer flex items-center justify-center w-full p-1 mt-4 text-black font-bold transition duration-300 bg-[#FEE500] rounded hover:bg-zinc-400"
          >
            <img
              className="h-[20px] mr-[10px] text-[#191919]"
              src="/public/assets/kakao.png"
            />
            Start with Kakao
          </button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <div className="w-[250px] h-[1px] bg-gray-400"></div>
        </div>
        <p className="mt-4 text-sm text-center text-gray-400">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-amber-400">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
