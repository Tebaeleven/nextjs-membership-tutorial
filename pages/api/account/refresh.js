import cookie from 'cookie'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    if (req.method==='GET') {
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const refresh = cookies.refresh ?? false

        if (refresh === false) {
            return res.status(401).json({
                error: 'リフレッシュトークンがありません',
            })
        }

        const body = JSON.stringify({
            refresh,
        })

        try {
            const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            })

            const data = await apiRes.json()

            if (apiRes.status === 201) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize("access", data.access, {
                        httpOnly: false,
                        secure: true,
                        sameSite: 'Lax',
                        path: '/',
                        maxAge: 60 * 60, //1時間
                    }),
                ])

                return res.status(apiRes.status).json({
                    error: 'リフレッシュトークン取得に成功しました',
                })
            } else {
                return res.status(apiRes.status).json({
                    error: 'リフレッシュトークン取得に失敗しました',
                })
            }

        } catch (err) {
            return res.status(500).json({
                error: 'リフレッシュトークンの取得に失敗しました',
            })
        }
    } else {
        res.setHeader('Allow', ['GET'])
        return res.status(405).json({ error: `Method ${req.method} not allowed` })
    }
}