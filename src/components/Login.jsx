import React from "react";
import NavBar from "./NavBar";

export default function Login() {
  const inputClass =
    "w-full p-4 text-white transition duration-300 bg-black border border-zinc-400 rounded focus:border-amber-400 focus:outline-none focus:text-amber-400";

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-[400px] mt-20">
          <div className="relative mb-6 text-gray-500 focus-within:text-amber-400">
            <label className="block mb-2 text-sm" htmlFor="username">
              아이디
            </label>
            <input
              type="text"
              id="username"
              className={inputClass}
              placeholder="아이디 입력"
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
              placeholder="비밀번호 입력"
              autoComplete="off"
            />
          </div>
        </div>

        <button className="w-[140px] py-3 mt-6 text-white transition duration-300 rounded bg-amber-500 hover:bg-amber-600">
          로그인
        </button>

        <p className="mt-6 text-sm text-center text-gray-400">
          아직 계정이 없으신가요?{" "}
          <a href="/Signup" className="text-amber-400">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
