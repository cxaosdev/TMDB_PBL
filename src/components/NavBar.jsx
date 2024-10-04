import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onClickHome = () => {
    navigate("/");
  };
  const onClickLogIn = () => {
    navigate(`/Login`);
  };
  const onClickSignUp = () => {
    navigate(`/Signup`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full text-white bg-black">
      <div className="flex items-center justify-between h-[80px] px-4 md:px-12">
        <img
          onClick={onClickHome}
          className="w-[130px] cursor-pointer"
          src="/src/assets/logo.png"
          alt="logo"
        />

        <ul className="items-center hidden md:flex gap-7">
          <li className="cursor-pointer" onClick={onClickSignUp}>
            회원가입
          </li>
          <li className="cursor-pointer" onClick={onClickLogIn}>
            로그인
          </li>
          <li className="text-[25px] cursor-pointer ml-auto">☾☼</li>
        </ul>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl cursor-pointer">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul className="top-[80px] left-0 w-full bg-black text-center flex flex-col gap-7 py-4">
          <li className="cursor-pointer" onClick={onClickSignUp}>
            회원가입
          </li>
          <li className="cursor-pointer" onClick={onClickLogIn}>
            로그인
          </li>
          <li className="text-[25px] cursor-pointer">☾☼</li>
        </ul>
      )}
    </div>
  );
}
