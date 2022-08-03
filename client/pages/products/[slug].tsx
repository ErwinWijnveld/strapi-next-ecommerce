import ImageSlider from "../../components/ImageSlider";
import Layout from "../../components/Layout";
import TitlePrice from "../../components/TitlePrice";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../../lib/auth";
import markdownToHtml from "../../lib/markdownToHtml";

const Product = ({product, description} : any) => {
    console.log(product)
    const productAttributes = product?.attributes;
    return (
        <Layout>
            <div className="single-product container relative">
                <TitlePrice title={productAttributes?.title} price={productAttributes?.price} />
                <ImageSlider images={productAttributes?.images?.data}/>
                {productAttributes?.description && <div className="product-description" dangerouslySetInnerHTML={{__html: productAttributes?.description}} />}
            </div>
        </Layout>
    )
}

export default Product

export async function getServerSideProps({req, params}: any) {
    const {slug} = params;
    const jwt = typeof window !== 'undefined' ? getTokenFromLocalCookie() : getTokenFromServerCookie(req)
    const productResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/products/?filters\[Slug\][$eq]=${slug}&populate=*`, jwt ? {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    } :
    ''
    );

    return {
        props: {
            product: productResponse.data[0]
        }
    }
}