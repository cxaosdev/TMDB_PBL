import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function MyPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 현재 로그인된 유저 정보 가져오기
    const getUserInfo = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user info:", error);
      } else {
        setUser(data.user);
      }
    };

    getUserInfo();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center bg-zinc-900 text-white text-3xl">
      <p>이름: {user.user_metadata?.name || "이름 정보 없음"}</p>
      <p>이메일: {user.email}</p>
    </div>
  );
}
