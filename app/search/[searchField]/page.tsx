import { SearchProducts } from "@/components/user"

interface SearchPageProps {
  params: {
    searchField: string;
  };
}
const SearchPage = ({ params }: SearchPageProps) => {
  const decodedParams = decodeURIComponent(params.searchField);
  return (
    <div>
        <SearchProducts searchField={decodedParams}/>
    </div>
  );
};

export default SearchPage;
