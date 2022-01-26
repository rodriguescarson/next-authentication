import { getSession, useSession } from 'next-auth/react'
function Blog({ data }) {
    const data1 = {
        user: {
            name: "carson",
            email: "rodrigues",
            image: "im"
        },
        expires: Date // This is the expiry of the session, not any of the tokens within the session
    }

    const { data1: session, status } = useSession()
    return (<h1>Blog page {data}</h1>)
}

export default Blog

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: `/api/auth/signin?callbackUrl=${process.env.REDIRECT_URL}`,
                permanent: false
            }
        }
    }
    return {
        props: {
            session,
            data: session ? 'List of 100 personalized blog post' : 'List of free blogs'
        }
    }
}