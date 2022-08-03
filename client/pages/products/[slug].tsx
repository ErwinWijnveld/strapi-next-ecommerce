import ImageSlider from "../../components/ImageSlider";
import Layout from "../../components/Layout";
import TitlePrice from "../../components/TitlePrice";
import { fetcher } from "../../lib/api";

const Product = ({product} : any) => {
    console.log(product)
    const productAttributes = product?.attributes;
    return (
        <Layout>
            <div className="single-product container relative">
                <TitlePrice title={productAttributes?.title} price={productAttributes?.price} />
                <ImageSlider images={productAttributes?.images?.data}/>
            </div>
        </Layout>
    )
}

export default Product

export async function getServerSideProps({params}: any) {
    const {slug} = params;
    const productResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/products/?filters\[Slug\][$eq]=${slug}&populate=*`);
    return {
        props: {
            product: productResponse.data[0]
        }
    }
}