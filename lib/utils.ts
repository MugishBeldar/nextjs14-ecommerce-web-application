import { ProductTypes } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeEachWord(string:string) {
  return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function generatePriceRanges({ products }: { products: ProductTypes[] }) {
  const minPrice = Math.min(...products.map((item) => item.price));
  const maxPrice = Math.max(...products.map((item) => item.price));
  const priceRanges: string[] = [];

  for (let start = Math.floor(minPrice / 10000) * 10000; start <= maxPrice; start += 10000) {
    const end = start + 10000;
    priceRanges.push(`${start + 1}-${end}`);
  }
  return priceRanges;
}

// export function generateBrands({ products }: { products: ProductTypes[] }) {
//   const brands = products.map((product) => product.brand);
//   const uniqueBrands = Array.from(new Set(brands));
//   return uniqueBrands;
// }

// export function generateCategories({ products }: { products: ProductTypes[] }) {
//   const categories = products.map((product) => product.category);
//   const uniqueCategories = Array.from(new Set(categories));
//   return uniqueCategories;
// }

export const filterProducts = ({
  products,
  selectBrands,
  selectCategories,
  selectPrices,
}: {
  products: ProductTypes[];
  selectCategories?: string[];
  selectPrices?: string[];
  selectBrands?: string[];
}) => {
  return products.filter((product) => {
    // const matchesCategory = selectCategories?.length === 0 || selectCategories?.includes(product.category);

    // const matchesPrice =
    //   selectPrices?.length === 0 ||
    //   selectPrices?.some((priceRange) => {
    //     const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    //     return product.price >= minPrice && product.price <= maxPrice;
    //   });

    // const matchesBrand = selectBrands?.length === 0 || selectBrands?.includes(product.brand);

    // return matchesCategory && matchesPrice && matchesBrand;
  });
};

export const sortByProduct = ({
  products,
  sortBy,
}: {
  products: ProductTypes[];
  sortBy: string | undefined;
}) => {
  switch (sortBy) {
    case "Price (Lowest First)":
      return products.sort((a, b) => a.price - b.price);

    case "Price (Highest First)":
      return products.sort((a, b) => b.price - a.price);

    case "Latest Arrival":
      // Assuming you have an arrival date field on your ProductTypes, use it here
      // return products.sort((a, b) => new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime());

    default:
      return products; // Return the products as is if sortBy is not recognized
  }
};