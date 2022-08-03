import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { useFetchUser } from '../contexts/authContext'

const Home: NextPage = () => {

  const {user, loading} = useFetchUser()

  return (
    <Layout user={user}>
      <h1>Home</h1>
    </Layout>
  )
}

export default Home
