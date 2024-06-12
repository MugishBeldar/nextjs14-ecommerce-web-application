'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

import {SearchBar} from "./search-bar";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { CategoryModal } from "./modals/category-modal";
import { getAllCategorisWithProductCount, deleteCategory, getCategories } from "@/actions/category";
import { CategoryTypes, CategoryWithProductCount } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaginationComponent } from "./pagination";

interface CategoriesTableProps {
  categories: boolean;
}

const CategoriesTable = ({ categories }: CategoriesTableProps) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<CategoryTypes[]>([]);
  const { categoriesData, setCategoriesData, setViewingCategoryId } = useAppStore();
  const [categoriesWithProductCount, setCategoriesWithProductCount] = useState<CategoryWithProductCount[] | []>([]);

  const itemsPerPage = 10;

  useEffect(() => {
    async function getCategoriesProduct() {
      const result = await getAllCategorisWithProductCount();
      setCategoriesWithProductCount(result);
    }
    getCategoriesProduct();
  }, []);

  useEffect(() => {
    async function getCategoriesProduct() {
      const result = await getAllCategorisWithProductCount();
      setCategoriesWithProductCount(result);
    }
    getCategoriesProduct();
  }, [categoriesData]);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  let currentItems;

  if (categories) {
    currentItems = categoriesData.slice(firstIndex, lastIndex);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchCategory = (id: string) => {
    setViewingCategoryId(id);
    setCategoryModal(true);
  };

  const handleDelete = async (id: string) => {
    const result = await getAllCategorisWithProductCount();
    setCategoriesWithProductCount(result);
    const categoryDetails = categoriesWithProductCount.find((c) => c.id === id);
    if (categoryDetails?.products?.length === 0) {
      await deleteCategory(id);
      const response = await getCategories();
      if (response && response.length) {
        setCategoriesData(response);
      } else {
        setCategoriesData([]);
      }
    } else {
      toast.info("You can't delete this category as it has products.");
    }
  };

  const handleEdit = (id: string) => {
    setViewingCategoryId(id);
    setCategoryModal(true);
  };


  const handleSearchResults = (results: CategoryTypes[]) => {
    setSearchResults(results);
  };

  return (
    <div>
      <CategoryModal
        setCategoryModal={setCategoryModal}
        categoryModal={categoryModal}
      />
      <div className="bg-surface rounded-3xl">
        <div className=" felx justify-center items-center py-4 px-5 mt-4">
          <div className="relative ">
            <SearchBar
              data={categoriesWithProductCount}
              searchField="categoryName"
              onSearchResults={handleSearchResults}
              placeholder="Search Categories..."
            />
            <div className=" absolute z-50 top-full left-0 w-full my-1 bg-surface rounded-b-xl rounded-md shadow-2xl">
              {searchResults &&
                searchResults.length > 0 &&
                searchResults.map((c: CategoryTypes, index: number) => {
                  return (
                    <div
                      key={c.id}
                      className={cn(
                        "px-3",
                        index === searchResults.length - 1
                          ? ""
                          : "border-b border-secondary-black"
                      )}
                    >
                      <p
                        onClick={() => handleSearchCategory(c.id)}
                        className="px-2 py-3 my-2 hover:bg-primary-background rounded-2xl cursor-pointer"
                      >
                        {c.categoryName}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-surface text-primary-txt font-medium border-b-secondary-black">
                <>
                  <TableHead className="text-primary-txt font-medium">
                    No
                  </TableHead>
                  <TableHead className="text-primary-txt font-medium">
                    Category Name
                  </TableHead>
                  <TableHead className="text-primary-txt font-medium">
                    Total Products
                  </TableHead>
                  <TableHead className="text-primary-txt font-medium">
                    Edit
                  </TableHead>
                  <TableHead className="text-primary-txt font-medium">
                    Delete
                  </TableHead>
                </>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {currentItems &&
                currentItems.map((item: CategoryTypes, index: number) => (
                  <>
                    <TableRow
                      key={item.id}
                      className="hover:bg-primary-background font-light border-b-secondary-black cursor-pointer"
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="">{item.categoryName}</TableCell>
                      <TableCell className="line-clamp-1">
                        <div className="flex-1">
                          {categoriesWithProductCount &&
                            categoriesWithProductCount.length > 0 &&
                            categoriesWithProductCount.find(
                              (c) => c.categoryName === item.categoryName
                            )
                            ? categoriesWithProductCount.find(
                              (c) => c.categoryName === item.categoryName
                            )?.products?.length ?? 0
                            : 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <MdOutlineEdit
                          size={22}
                          className="text-secondary-blue"
                          onClick={() => handleEdit(item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <MdOutlineDelete
                          size={22}
                          className="text-red-400/80"
                          onClick={() =>
                            handleDelete(item.id)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
          {currentItems && currentItems.length > 0 && (
            <div className="flex items-center">
              <div className="flex-1 px-4 text-custom-font">
                Total {Math.ceil(categoriesData.length)} Categories
              </div>
              <div className="flex justify-end mt-1 pb-2   ">
                <PaginationComponent 
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                totalItems={categoriesData.length}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {currentItems && currentItems.length === 0 && (
        <div className="text-center text-custom-font mt-4">
          No Categoryies Are Availabe
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;
