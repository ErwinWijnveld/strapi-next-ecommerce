import Head from "next/head"
import { UserProvider } from "../contexts/authContext"
import Nav from "./Nav"

const Layout = ({ user, loading = false, children }:any) => {
    return (
        <UserProvider value={{user, loading}}>
            <Head>
                <title>Erwin's site</title>
            </Head>
            <Nav/>
            <main>
                {children}
            </main>
        </UserProvider>
    )
}

export default Layout