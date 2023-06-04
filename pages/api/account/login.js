import cookie from 'cookie'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body

        const body = JSON.stringify({
            email,
            password,
        })
        
        try {
            const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            })

            const data = await apiRes.json()

            if (apiRes.status === 201) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize('access', data.access, {
                        httpOnly: false,
                        secure: true, //HTTPS使用時のみ
                        sameSite: 'Lax',
                        path: '/',
                        maxAge: 60 * 60, //1時間
                    }),
                    cookie.serialize('refresh', data.access, {
                        httpOnly: false,
                        secure: true, //HTTPS使用時のみ
                        sameSite: 'Lax',
                        path: '/',
                        maxAge: 60 * 60 * 24 * 3, //3日
                    })
                ])
                return res.status(200).json({
                    success: 'ログインに成功しました',
                })
            } else {
                return res.status(apiRes.status).json({
                    error: 'ログインに失敗しました',
                })
            }

        } catch (err) {
            return res.status(500).json({
                error: 'ログインに失敗しました',
            })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({ error: `Method ${req.method} not allowed` })
    }
}