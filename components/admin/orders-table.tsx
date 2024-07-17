"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { OrderTypes} from "@/types";
import { useAppStore } from "@/store";
import { SearchBar } from "./search-bar";
import { getOrders } from "@/actions/order";
import { OrderModal } from "./modals/order-modal";
import { PaginationComponent } from "./pagination";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";

interface ProductsTableProps {
  Orders: boolean;
}

const OrdersTable = ({ Orders }: ProductsTableProps) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [orderModal, setOrderModal] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<OrderTypes[] | []>([]);
  const [searchOrders, setSearchOrders] = useState<OrderTypes[] | []>([]);

  const { ordersData, setOrdersData, setviewingOrderId } = useAppStore();
  
  const itemsPerPage = 10;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function getOrdersData() {
      const response = await getOrders();
      if (response && response.length > 0) {
        setOrdersData(response);
      }
    }
    getOrdersData();
  }, [setOrdersData]);

  useEffect(() => {
    if (ordersData) {
      const result = ordersData.slice(firstIndex, lastIndex);
      setCurrentItems(result);
    }
  }, [ordersData, firstIndex, lastIndex]);

  if (!isMounted) {
    return null;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOrderEdit = async (id: string) => {
    setviewingOrderId(id);
    setOrderModal(true);
    setSearchOrders([])
  };

  const handleSearchResults = (results: OrderTypes[]) => {
    setSearchOrders(results);
  };

  return (
    <>
      <div className="bg-surface rounded-3xl">
        <OrderModal
          orderModal={orderModal}
          setOrderModal={setOrderModal}
        />
        <div className=" felx justify-center items-center py-4 px-5 mt-2">
          <div className="relative block">
            <SearchBar
              data={ordersData}
              searchField="id"
              onSearchResults={handleSearchResults}
              placeholder="Search Order By Id..."
            />
            <div className="absolute z-50 top-full left-0 w-full my-1 bg-surface rounded-b-xl rounded-md shadow-2xl">
              {searchOrders &&
                searchOrders.length > 0 &&
                searchOrders.map((o: OrderTypes, index: number) => {
                  return (
                    <div
                      key={o.id}
                      className={cn(
                        "px-3",
                        index === searchOrders.length - 1
                          ? ""
                          : "border-b border-secondary-black"
                      )}
                    >
                      <p
                        onClick={() => handleOrderEdit(o.id)}
                        className="px-2 py-3 my-2 hover:bg-primary-background rounded-2xl cursor-pointer"
                      >
                        {o.user.name}
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
                  <TableHead className="text-base text-primary-txt">No</TableHead>
                  <TableHead className="text-base text-primary-txt">Customer Name</TableHead>
                  <TableHead className="text-base text-primary-txt">Ordered Items</TableHead>
                  <TableHead className="text-base text-primary-txt">Total Price</TableHead>
                  <TableHead className="text-base text-primary-txt">Payment Status</TableHead>
                </>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentItems &&
                currentItems.map((item: OrderTypes, index: number) => (
                  <>
                    <TableRow
                      key={item.id}
                      className="hover:bg-primary-background text-primary-txt font-light  border-b-secondary-black cursor-pointer"
                    >
                      <TableCell>{(((currentPage-1)*10)+index+1)}</TableCell>
                      <TableCell className="">{item.user.name}</TableCell>
                      <TableCell className="">
                        {item.orderProducts?.length}
                      </TableCell>
                      <TableCell>${item.totalPrice.toLocaleString('us')}</TableCell>
                      <TableCell>
                      <div className="flex justify-between items-center">
                          <div
                            className={cn(
                              " w-[50%] text-center py-[2px]",
                              item.paymentStatus.toLowerCase() == 'success'
                                ? "rounded-md bg-emerald-500/15  text-sm text-emerald-500"
                                : " rounded-md bg-destructive/15 text-sm text-destructive"
                            )}
                          >
                            {item.paymentStatus}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>

          {
            Orders && ordersData.length > 0 && (
              <div className="flex items-center">
                <div className="flex-1 px-4 text-custom-font">Total {Math.ceil(ordersData.length)} Products</div>
                <div className="flex justify-end mt-1 pb-2   ">
                  <div className="flex justify-center items-center my-7">
                    <PaginationComponent
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      onPageChange={handlePageChange}
                      totalItems={ordersData.length}
                    />
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      {Orders && ordersData.length > 0 ? "" : <div className="text-center mt-4 text-custom-font"><p>No Orders Are Availabes</p></div>}
    </>);
};

export default OrdersTable;