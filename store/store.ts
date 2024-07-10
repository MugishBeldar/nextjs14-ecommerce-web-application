import { create } from "zustand";
import { createEcommerceAppSlice } from "./slices";
import { EcommerceAppSliceTypes } from "./slices/ecommerce-app-slice";
import { persist } from 'zustand/middleware'

export const useAppStore = create<EcommerceAppSliceTypes>()(persist((...a) => ({
  ...createEcommerceAppSlice(...a),
}),
  {
    name: 'ecommerce-app-slice',
    partialize: (state) => ({
      compareProduct: state.compareProduct
    }),
  }
));

