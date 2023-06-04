// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, password } = req.body
        
        const body = JSON.stringify({
            name,
            email,
            password,
        })
        console.log(body)
        try {
            const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body:body,
            })

            const data = await apiRes.json()

            if (apiRes.status === 201) {
                return res.status(200).json({
                    error: 'アカウント登録に成功しました',
                })
            } else {
                return res.status(apiRes.status).json({
                    error: 'アカウント登録に失敗しました',
                })
            }
        } catch (err) {
            console.log("送った",err)

            return res.status(500).json({
                error:'アカウント登録に失敗しました',
            })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({ error: `Method ${req.method} not allowed` })
    }
}