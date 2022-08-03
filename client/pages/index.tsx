import { ht } from 'date-fns/locale'
import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { useFetchUser } from '../contexts/authContext'
import { fetcher } from '../lib/api'
import { getTokenFromLocalCookie, getTokenFromServerCookie } from '../lib/auth'
import markdownToHtml from '../lib/markdownToHtml'

const Home: NextPage = ({page, content}:any) => {

    const {user, loading} = useFetchUser()

    console.log(page)

    const pageAttributes = page?.attributes;

    return (
        <Layout user={user}>
            <div className="container">
                {pageAttributes.title && <h1 className='text-5xl'>{pageAttributes.title}</h1>}
                {content && <div className="content" dangerouslySetInnerHTML={{__html: content}} />}
            </div>
        </Layout>
    )
}

export default Home

export async function getServerSideProps({req, params}: any) {
    const jwt = typeof window !== 'undefined' ? getTokenFromLocalCookie() : getTokenFromServerCookie(req)
    const pageResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages/?filters\[Slug\][$eq]=home&populate=*`, jwt ? {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    } :
    ''
    );

    const content = await markdownToHtml(pageResponse.data[0].attributes.content);

    return {
        props: {
            page: pageResponse.data[0],
            content
        }
    }
}