// import { ProductTypes } from "@/types";
// import { Address, User } from "@prisma/client";
import {
  CategoryTypes,
  OrderTypes,
  ProductTypes,
} from "@/types";
import { Address, User } from "@prisma/client";
import { StateCreator } from "zustand";
export interface EcommerceAppSliceTypes {
  // admin
  collapsSidbar?: boolean;
  setCollapsSidbar: (data: boolean) => void;
  productsData: ProductTypes[] | [];
  setProductsData: (data: ProductTypes[]) => void;
  toggleSheet?: boolean;
  setToggleSheet: (data: boolean) => void;
  viewingProductId: string;
  setviewingProductId: (data: string) => void;
  categoriesData: CategoryTypes[] | [];
  setCategoriesData: (data: CategoryTypes[]) => void;
  editCategory: CategoryTypes | null;
  setEditCategory: (data: CategoryTypes) => void;
  viewingProduct: ProductTypes | undefined;
  setViewingProduct: (data: ProductTypes) => void;
  viewingCategoryId: string;
  setViewingCategoryId: (data: string) => void;
  ordersData: OrderTypes[] | [];
  setOrdersData: (data:any) => void;
  viewingOrderId: string;
  setviewingOrderId: (data: string) => void;
  viewingOrder: OrderTypes | null;
  setViewingOrder: (data: OrderTypes) => void;

  // user
  searchTerm?: string;
  setSearchTerm: (data: string) => void;
  openModal?: boolean;
  setOpenModal: (data: boolean) => void;
  userDetails?: User | null;
  setUserDetails: (data: User) => void;
  userAddress?: Address | null;
  setUserAddress: (data: Address) => void;
  productCarouselImage?: string;
  setProductCarouselImage: (data: string) => void;
  filterProduct: ProductTypes[];
  setFilterProduct: (data: ProductTypes[]) => void;
  compareProduct: ProductTypes[];
  setCompareProduct: (data: ProductTypes[]) => void;
  compareLimitExceeded?: boolean;
  setCompareLimitExceeded: (data: boolean) => void;
}
const createEcommerceAppSlice: StateCreator<EcommerceAppSliceTypes> = (
  set,
  get
) => ({
  // admin
  collapsSidbar: false,
  setCollapsSidbar: (open: boolean) => {
    set({ collapsSidbar: open });
  },
  productsData: [],
  setProductsData: (data: ProductTypes[]) => {
    set({ productsData: data });
  },
  toggleSheet: false,
  setToggleSheet: (open: boolean) => {
    set({ toggleSheet: open });
  },
  viewingProductId: "",
  setviewingProductId: (data: string) => {
    set({ viewingProductId: data });
  },
  viewingProduct: undefined,
  setViewingProduct: (data: ProductTypes) => {
    set({ viewingProduct: data });
  },
  categoriesData: [],
  setCategoriesData: (data: CategoryTypes[]) => {
    set({ categoriesData: data });
  },
  editCategory: null,
  setEditCategory: (data: CategoryTypes) => {
    set({ editCategory: data });
  },
  viewingCategoryId: "",
  setViewingCategoryId: (data: string) => {
    set({ viewingCategoryId: data });
  },
  ordersData: [],
  setOrdersData: (data: OrderTypes[]) => {
    set({ ordersData: data });
  },
  viewingOrderId: "",
  setviewingOrderId: (data: string) => {
    set({ viewingOrderId: data });
  },
  viewingOrder: null,
  setViewingOrder: (data: OrderTypes) => {
    set({ viewingOrder: data });
  },

  // user
  searchTerm: '',
  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },
  openModal: false,
  setOpenModal: (open: boolean) => {
    set({ openModal: open });
  },
  userDetails: null,
  setUserDetails: (user: User) => {
    set({ userDetails: user });
  },
  userAddress: null,
  setUserAddress: (address: Address) => {
    set({ userAddress: address });
  },
  productCarouselImage: '',
  setProductCarouselImage: (image: string) => {
    set({ productCarouselImage: image });
  },
  filterProduct: [],
  setFilterProduct: (products: ProductTypes[]) => {
    set({ filterProduct: products });
  },
  compareProduct: [],
  setCompareProduct: (products: ProductTypes[]) => {
    set({ compareProduct: products });
  },
  compareLimitExceeded: false,
  setCompareLimitExceeded: (open: boolean) => {
    set({ compareLimitExceeded: open });
  },
});

export { createEcommerceAppSlice };
