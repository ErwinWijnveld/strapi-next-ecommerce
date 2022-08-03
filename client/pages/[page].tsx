import Router from 'next/router';
import React from 'react'
import Layout from '../components/Layout';
import { useFetchUser } from '../contexts/authContext';
import { fetcher } from '../lib/api';
import { getTokenFromLocalCookie, getTokenFromServerCookie } from '../lib/auth';

const Page = ({page, content}:any) => {
    const {user, loading} = useFetchUser()

    const pageAttributes = page?.attributes;

    return (
        <Layout user={user}>
            <div className="container">
                {pageAttributes.title && <h1 className='text-5xl'>{pageAttributes.title}</h1>}
                {pageAttributes.content && <div className="content" dangerouslySetInnerHTML={{__html: pageAttributes.content}} />}
            </div>
        </Layout>
    )
}

export default Page

export async function getServerSideProps({req, params}: any) {
    const {page} = params;
    if (page === 'home') {
        return {notFound: true }
    }
    const jwt = typeof window !== 'undefined' ? getTokenFromLocalCookie() : getTokenFromServerCookie(req)
    const pageResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages/?filters\[Slug\][$eq]=${page}&populate=*`, jwt ? {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    } :
    ''
    );

    if (pageResponse.data.length === 0) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            page: pageResponse.data[0]
        }
    }
}