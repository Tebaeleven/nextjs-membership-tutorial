import Link from "next/link";

import React, { Component } from "react";

export default class Navigation extends Component {
    render() {
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
                                <Link href="/login">
                                    <p className="button-nav mr-4">
                                        ログイン
                                    </p>
                                </Link>
                                <Link href="/register">
                                    <p className="button-nav mr-4">
                                        アカウント登録
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
