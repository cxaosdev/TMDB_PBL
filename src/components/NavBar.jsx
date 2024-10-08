import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { supabase } from "../supabaseClient";

export default function NavBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${debouncedSearchQuery}&language=ko`
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  return (
    <div className="fixed top-0 z-50 w-full text-white bg-black">
      <div className="flex items-center justify-between h-[80px] px-4 md:px-12">
        <div className="flex items-center space-x-4">
          <img
            onClick={() => navigate("/")}
            className="w-[130px] cursor-pointer"
            src="/public/assets/logo.png"
            alt="logo"
          />

          <div className="relative flex items-center text-white focus-within:text-amber-400">
            <label className="mb-2 text-l sm:hidden" onClick={toggleSearch}>
              <FaSearch />
            </label>
            {showSearch && (
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-[10px] w-[200px] p-2 text-white transition duration-300 bg-black border rounded border-zinc-400 focus:border-amber-400 focus:outline-none focus:text-amber-400"
                placeholder="검색"
                autoComplete="off"
              />
            )}

            {/* 640px 이상 */}
            <div className="items-center hidden sm:flex">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-[10px] w-[250px] p-2 text-white transition duration-300 bg-black border rounded border-zinc-400 focus:border-amber-400 focus:outline-none focus:text-amber-400"
                placeholder="검색"
                autoComplete="off"
              />
            </div>

            {searchResults.length > 0 && (
              <ul className="absolute left-0 z-10 w-full text-black bg-white top-full">
                {searchResults.map((movie) => (
                  <li
                    key={movie.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() =>
                      navigate(`/detail/${movie.title}`, { state: movie })
                    }
                  >
                    {movie.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <ul className="items-center hidden md:flex gap-7">
          {!user ? (
            <>
              <li
                className="cursor-pointer"
                onClick={() => navigate(`/Signup`)}
              >
                회원가입
              </li>
              <li className="cursor-pointer" onClick={() => navigate(`/Login`)}>
                로그인
              </li>
            </>
          ) : (
            <li className="relative">
              <FaUserCircle
                className="text-3xl cursor-pointer"
                onClick={handleProfileClick}
              />
              {showDropdown && (
                <ul className="absolute w-[130px] right-0 mt-2 text-black bg-white border rounded shadow-md">
                  <li
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => navigate(`/MyPage`)}
                  >
                    마이 페이지
                  </li>
                  <li
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </li>
                </ul>
              )}
            </li>
          )}
          <li className="text-[25px] cursor-pointer ml-auto">☾☼</li>
        </ul>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl cursor-pointer">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul className="fixed top-[80px] left-0 w-full bg-black text-center flex flex-col gap-7 py-4">
          {!user ? (
            <>
              <li
                className="cursor-pointer"
                onClick={() => navigate(`/Signup`)}
              >
                회원가입
              </li>
              <li className="cursor-pointer" onClick={() => navigate(`/Login`)}>
                로그인
              </li>
            </>
          ) : (
            <>
              <li
                className="cursor-pointer"
                onClick={() => navigate(`/profile`)}
              >
                마이 페이지
              </li>
              <li className="cursor-pointer" onClick={handleLogout}>
                로그아웃
              </li>
            </>
          )}
          <li className="text-[25px] cursor-pointer">☾☼</li>
        </ul>
      )}
    </div>
  );
}
