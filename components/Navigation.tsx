import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";

export default function Navigation() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const logoutHandler = async () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            await dispatch(logout());
        }
    };
    return (
        <>
            <div className="bg-gray-900">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">
                                <p className="text-white hover:text-gray-50 font-extrabold text-lg">
                                    有料コンテンツ会員サイトチュートリアル
                                </p>
                            </Link>
                        </div>

                        <div>
                            {isAuthenticated ? (
                                <div
                                    onClick={logoutHandler}
                                    className="cursor-pointer button-nav"
                                >
                                    ログアウト
                                </div>
                            ) : (
                                <div>
                                    <Link href="/login">
                                        <p className="button-nav mr-4">
                                            ログイン
                                        </p>
                                    </Link>
                                    <Link href="/register">
                                        <p className="button-nav">
                                            アカウント登録
                                        </p>
                                    </Link>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
