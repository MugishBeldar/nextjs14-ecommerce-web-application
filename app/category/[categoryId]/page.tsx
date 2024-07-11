import { CategoryProducts } from "@/components/user"

interface SearchPageProps {
  params: {
    categoryId: string;
  };
}
const SearchPage = ({ params }: SearchPageProps) => {
  const decodedParams = decodeURIComponent(params.categoryId);
  console.log('SearchPage ~ decodedParams:', decodedParams);
  return (
    <div>
        <CategoryProducts categoryId={decodedParams}/>
    </div>
  );
};

export default SearchPage;
