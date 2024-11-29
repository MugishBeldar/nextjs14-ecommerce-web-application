import {ProductReview, SingleProduct} from "@/components/user";
import {SimilarProducts} from "@/components/user/carousel";

interface SingleProductPageProps {
    params: {
        productId: string;
    };
}

const SingleProductPage = ({params}: SingleProductPageProps) => {
    return (
        <div>
            <SingleProduct productId={params.productId}/>
            <ProductReview productId={params.productId}/>
            <SimilarProducts productId={params.productId}/>
        </div>
    );
};

export default SingleProductPage;
