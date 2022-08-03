import Router from "next/router"
import { useEffect, useState } from "react"
import ErrorText from "../components/ErrorText"
import Layout from "../components/Layout"
import { useFetchUser, useUser } from "../contexts/authContext"
import { fetcher } from "../lib/api"
import { setToken } from "../lib/auth"

const Login = () => {

    const {user, loading} = useFetchUser()

    const [error, setError] = useState(null)

    if (user) {
        Router.push("/")
    }

    const [data, setData] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e:any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e:any) => {
        const authResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier: data.username,
                password: data.password
            })
        })
        console.log(authResponse)
        if (authResponse.user) {
            setToken(authResponse)
            return
        }
        setError(authResponse.error.message)
    }

    return (
        <Layout user={user}>
            <div className="h-screen flex items-center justify-center container">
                <div className="p-8 rounded-xl bg-highlight flex flex-col gap-4 max-w-md w-full">
                    {error && <ErrorText error={error} />}
                    <input 
                        className="bg-transparent border-highlightsecondary border-2 rounded-xl p-2 text-white" 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="Username or E-mail" 
                        onChange={(e) => handleChange(e)}
                    />
                    <input 
                        className="bg-transparent border-highlightsecondary border-2 rounded-xl p-2 text-white" 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password" 
                        onChange={(e) => handleChange(e)}
                    />
                    <button className="btn" onClick={(e) => handleSubmit(e)}>Login</button>
                </div>
            </div>
        </Layout>
    )
}

export default Login