import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

      console.log(isAuthenticated);
  
  return (
        <>
            {isAuthenticated && user ? (
                <div>
                    <div>ようこそ、{user.name}</div>
              <div>あなたは無料会員です</div>
            
                </div>
            ) : (
                <div className="text-center text-2xl">
                    有料コンテンツのある会員サイトのチュートリアルdadasda
            </div>

            )}
        </>
    );
}
