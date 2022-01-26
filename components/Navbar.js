import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

function Navbar() {
    const data = {
        user: {
            name: "carson",
            email: "rodrigues",
            image: "im"
        },
        expires: Date // This is the expiry of the session, not any of the tokens within the session
    }

    const { data: session, status } = useSession()

    return (
        <nav className='header'>
            <h1 className='logo'>
                <a href='#'>NextAuth</a>
            </h1>
            <ul className={`main-nav ${!status ? 'loading' : 'loaded'}`}>
                <li>
                    <Link href='/'>
                        <a>Home</a>
                    </Link>
                </li>
                {status === "authenticated" && (

                    <li>

                        <Link href='/dashboard'>
                            <a>Dashboard</a>
                        </Link>
                    </li>
                )}
                <li>
                    <Link href='/blog'>
                        <a>Blog</a>
                    </Link>
                </li>
                {!(status === "authenticated") && (
                    <li>
                        <Link href='/api/auth/signin'>
                            <a onClick={e => {
                                e.preventDefault(
                                    signIn('github')
                                )
                            }}>Sign In</a>
                        </Link>
                    </li>

                )}
                {status === "authenticated" && (
                    <li>
                        <Link href='/api/auth/signout'>
                            <a onClick={e => {
                                e.preventDefault(
                                    signOut()
                                )
                            }}>Sign Out</a>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar