import { ProductReview, SingleProduct } from "@/components/user";

interface SingleProductPageProps {
  params: {
    productId: string;
  };
}
const SingleProductPage = ({ params }: SingleProductPageProps) => {
  return (
    <div>
      <SingleProduct productId={params.productId} />
      <ProductReview productId={params.productId}/>
      {/* <SimilarProducts /> */}
    </div>
  );
};

export default SingleProductPage;
