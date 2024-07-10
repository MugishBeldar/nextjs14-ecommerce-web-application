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
    // storage: {
    // async getItem ( name: string ): StorageValue<unknown> {
    // return // get from storage however you want
    // },
    // async setItem ( name: string, storageValue: StorageValue<unknown> ): Promise<void> {
    // // set in storage however you want
    // },
    // async removeItem ( name: string ): Promise<void> {
    // // remove/delete from storage however you want
    // },
    // },
  }
));

