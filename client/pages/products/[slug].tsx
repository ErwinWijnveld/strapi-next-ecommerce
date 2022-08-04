import AddToCartButton from "../../components/AddToCartButton";
import ImageSlider from "../../components/ImageSlider";
import Layout from "../../components/Layout";
import TitlePrice from "../../components/TitlePrice";
import Variations from "../../components/Variations";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../../lib/auth";
import markdownToHtml from "../../lib/markdownToHtml";
import styles from './Products.module.scss'

const Product = ({product, description} : any) => {
    const productAttributes = product?.attributes;

    return (
        <Layout>
            <div className={styles.singleProduct}>
                <div className={styles.singleProductContent}>
                    
                    <ImageSlider className={styles.slider} images={productAttributes?.images?.data}/>
                    
                    <div className={styles.right}>
                        <TitlePrice title={productAttributes?.title} price={productAttributes?.price} />
                        {productAttributes?.description && <div className="product-description mb-8" dangerouslySetInnerHTML={{__html: productAttributes?.description}} />}
                        {productAttributes?.Variations && <Variations variations={productAttributes?.Variations} />}
                        <AddToCartButton />
                    </div>
                    
                </div>
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