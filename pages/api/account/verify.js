import cookie from 'cookie'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    if (req.method === 'GET') {
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies.access ?? false

        if (access === false) {
            return res.status(401).json({
                error: 'アクセストークンがありません',
            })
        }

        const body = JSON.stringify({
            token:access,
        })

        try {
            const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            })

            if (apiRes.status === 200) {
                return res.status(200).json({
                    error: '認証に成功しました',
                })
            } else {
                return res.status(apiRes.status).json({
                    error: '認証に失敗しました',
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