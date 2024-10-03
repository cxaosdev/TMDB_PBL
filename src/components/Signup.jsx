import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import NavBar from "./NavBar";

export default function Signup() {
  const inputClass =
    "w-full p-2 text-white transition duration-300 bg-black border border-zinc-400 rounded focus:border-amber-400 focus:outline-none focus:text-amber-400";

  return (
    <div className="min-h-screen bg-zinc-900">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen pt-8 pb-8">
        <div className="w-[400px] mt-20">
          <div className="relative mb-6 text-gray-500 focus-within:text-amber-400">
            <label className="block mb-2 text-sm" htmlFor="name">
              이름
            </label>
            <input
              type="text"
              id="name"
              className={inputClass}
              placeholder="이름 입력"
              autoComplete="off"
            />
          </div>

          <div className="relative mb-6 text-gray-500 focus-within:text-amber-400">
            <label className="block mb-2 text-sm" htmlFor="birthday">
              생년월일
            </label>
            <div className="relative">
              <input
                type="date"
                id="birthday"
                className={inputClass}
                onKeyDown={(e) => e.preventDefault()}
              />
              <FaCalendarAlt className="absolute text-gray-500 transform pointer-events-none top-4 right-4" />
            </div>
          </div>

          <div className="relative mb-6 text-gray-500 focus-within:text-amber-400">
            <label className="block mb-2 text-sm" htmlFor="email">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className={inputClass}
              placeholder="이메일 입력"
              autoComplete="off"
            />
          </div>

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
          <div className="relative mb-6 text-gray-500 focus-within:text-amber-400">
            <label className="block mb-2 text-sm" htmlFor="confirmPassword">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={inputClass}
              placeholder="비밀번호 확인"
              autoComplete="off"
            />
          </div>

          <button className="w-full py-3 mt-6 text-white transition duration-300 rounded bg-amber-500 hover:bg-amber-600">
            회원가입
          </button>
        </div>
        <p className="mt-6 text-sm text-center text-gray-400">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-amber-400">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
