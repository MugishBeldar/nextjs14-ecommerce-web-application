// import { getProductFromId } from "@/data-access/products";
import { SingleProduct } from "@/components/user";
import { redirect } from "next/navigation";
// import { ProductReview, SimilarProducts, SingleProduct } from "../../../../../components/single-products";

interface SingleProductPageProps {
  params: {
    productId: string;
  };
}
const SingleProductPage = ({ params }: SingleProductPageProps) => {
  return (
    <div>
      <SingleProduct productId={params.productId} />
      {/* <ProductReview />
      <SimilarProducts /> */}
    </div>
  );
};

export default SingleProductPage;
