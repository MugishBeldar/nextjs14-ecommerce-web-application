"use client";
import { useEffect, useState } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { getCategories } from "@/actions/category";
import { PaginationComponent } from "./pagination";
import { SearchBar } from "./search-bar";
import { ProductModal } from "./modals/product-modal";
import { useAppStore } from "@/store";
import { ProductTypes } from "@/types";
import { deleteProduct, getProducts } from "@/actions/product";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";

interface ProductsTableProps {
  products: boolean;
}

const ProductsTable = ({ products }: ProductsTableProps) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [productModal, setProductModal] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<ProductTypes[] | []>([]);
  const [searchProducts, setSearchProducts] = useState<ProductTypes[] | []>([]);
  const { productsData, setviewingProductId, categoriesData, setProductsData, setCategoriesData } = useAppStore();
  
  const itemsPerPage = 10;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();
      if (response && response.length > 0) {
        setCategoriesData(response);
      }
    }
    fetchCategories();
  }, [setCategoriesData]);

  useEffect(() => {
    async function getDbProducts() {
      const response = await getProducts();
      if (response && response.length > 0) {
        // @ts-ignore
        setProductsData(response);
      }
    }
    getDbProducts();
  }, [setProductsData]);

  useEffect(() => {
    if (productsData) {
      const result = productsData.slice(firstIndex, lastIndex);
      setCurrentItems(result);
    }
  }, [productsData, firstIndex, lastIndex]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    toast.success("Product deleted successfully.");
    const response = await getProducts();
    if (response && response.length > 0) {
      setProductsData(response);
    } else {
      setProductsData([]);
    }
  };

  const handleProductEdit = async (id: string) => {
    setviewingProductId(id);
    setProductModal(true);
  };

  const handleSearchResults = (results: ProductTypes[]) => {
    setSearchProducts(results);
  };

  return (
    <>
      <div className="bg-surface rounded-3xl">
        <ProductModal
          productModal={productModal}
          setProductModal={setProductModal}
        />
        <div className=" felx justify-center items-center py-4 px-5 mt-2">
          <div className="relative block">
            <SearchBar
              data={productsData}
              searchField="productName"
              onSearchResults={handleSearchResults}
              placeholder="Search Products..."
            />
            <div className="absolute z-50 top-full left-0 w-full my-1 bg-surface rounded-b-xl rounded-md shadow-2xl">
              {searchProducts &&
                searchProducts.length > 0 &&
                searchProducts.map((c: ProductTypes, index: number) => {
                  return (
                    <div
                      key={c.id}
                      className={cn(
                        "px-3",
                        index === searchProducts.length - 1
                          ? ""
                          : "border-b border-secondary-black"
                      )}
                    >
                      <p
                        onClick={() => handleProductEdit(c.id)}
                        className="px-2 py-3 my-2 hover:bg-primary-background rounded-2xl cursor-pointer"
                      >
                        {c.productName}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-surface border-b-secondary-black">
                <>
                  <TableHead className="text-base text-primary-text">No</TableHead>
                  <TableHead className="text-base text-primary-text">Product Name</TableHead>
                  <TableHead className="text-base text-primary-text">Price</TableHead>
                  <TableHead className="text-base text-primary-text">Discount</TableHead>
                  <TableHead className="text-base text-primary-text">Categor Name</TableHead>
                  <TableHead className="text-base text-primary-text">Quantity</TableHead>
                  <TableHead className="text-base text-primary-text">Available</TableHead>
                  <TableHead className="text-base text-primary-text">Edit</TableHead>
                  <TableHead className="text-base text-primary-text">Delete</TableHead>
                </>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentItems &&
                currentItems.map((item: ProductTypes, index: number) => (
                  <>
                    <TableRow
                      key={item.id}
                      className="hover:bg-primary-background text-primary-text font-light  border-b-secondary-black cursor-pointer"
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="">{item.productName}</TableCell>
                      <TableCell className="">
                        ${item.price.toLocaleString('us')}
                      </TableCell>
                      <TableCell>{item.discount}%</TableCell>
                      <TableCell className="">
                        {
                          categoriesData.find(
                            (category) => category.id === item.categoryId
                          )?.categoryName
                        }
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <div className="flex justify-between items-center">
                          <div
                            className={cn(
                              " w-[50%] text-center py-[2px]",
                              item.quantity > 0
                                ? "rounded-md bg-emerald-500/15  text-sm text-emerald-500"
                                : " rounded-md bg-destructive/15 text-sm text-destructive"
                            )}
                          >
                            {item.quantity > 0 ? "Yes" : "No"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <MdOutlineEdit
                          size={22}
                          className="text-secondary-blue"
                          onClick={() => handleProductEdit(item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <MdOutlineDelete
                          size={22}
                          className="text-red-400/80"
                          onClick={() => handleDelete(item.id)}
                        />
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>

          {
            products && productsData.length > 0 && (
              <div className="flex items-center">
                <div className="flex-1 px-4 text-custom-font">Total {Math.ceil(productsData.length)} Products</div>
                <div className="flex justify-end mt-1 pb-2   ">
                  <div className="flex justify-center items-center my-7">
                    <PaginationComponent
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      onPageChange={handlePageChange}
                      totalItems={productsData.length}
                    />
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      {products && productsData.length > 0 ? "" : <div className="text-center mt-4 text-custom-font"><p>No Products Are Availabes</p></div>}
    </>);
};

export default ProductsTable;