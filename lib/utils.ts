import {CartProductTypes, CategoryTypes, ProductTypes} from "@/types";
import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function capitalizeEachWord(string: string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function generatePriceRanges({products}: { products: ProductTypes[] }) {
    const minPrice = Math.min(...products.map((item) => item.price));
    const maxPrice = Math.max(...products.map((item) => item.price));
    const priceRanges: string[] = [];

    for (let start = Math.floor(minPrice / 10000) * 10000; start < maxPrice; start += 10000) {
        const end = start + 10000;
        priceRanges.push(`${start + 1}-${end}`);
    }
    if (priceRanges.length === 0 || !priceRanges[priceRanges.length - 1].includes(`${maxPrice}`)) {
        const lastRangeStart = Math.floor(maxPrice / 10000) * 10000 + 1;
        const lastRangeEnd = Math.ceil(maxPrice / 10000) * 10000;
        priceRanges.push(`${lastRangeStart}-${lastRangeEnd}`);
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
                                   categories,
                                   products,
                                   selectBrands,
                                   selectCategories,
                                   selectPrices,
                               }: {
    categories: CategoryTypes[];
    products: ProductTypes[];
    selectCategories?: string[];
    selectPrices?: string[];
    selectBrands?: string[];
}) => {
    const matchesCategoryId = categories.filter((category) => {
        return selectCategories?.includes(category.categoryName)
    }).map((category) => category.id);

    return products.filter((product) => {
        const matchesCategory = matchesCategoryId?.length === 0 || matchesCategoryId?.includes(product.categoryId);

        const matchesPrice =
            selectPrices?.length === 0 ||
            selectPrices?.some((priceRange) => {
                const [minPrice, maxPrice] = priceRange.split("-").map(Number);
                return product.price >= minPrice && product.price <= maxPrice;
            });

        // const matchesBrand = selectBrands?.length === 0 || selectBrands?.includes(product.brand);

        return matchesCategory && matchesPrice;
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
            console.log('products:', products)
            return products.sort((a, b) => a.price - b.price);

        case "Price (Highest First)":
            return products.sort((a, b) => b.price - a.price);

        case "Latest Arrival":
            return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        default:
            return products;
    }
};

export const getTotalPayableAmount = ({products}: { products: CartProductTypes[] }) => {
    const totalAmount = products.reduce((total, product) => total + Math.round(product.product.price - (product?.product.price * product?.product.discount) / 100), 0).toLocaleString("en-IN");
    return totalAmount;
}

export const getTotalSavingAmount = ({products}: { products: CartProductTypes[] }) => {
    const savingAmount = products.reduce((total, product) => total + ((product.product?.price * product.product?.discount) / 100), 0).toLocaleString("en-IN")
    return savingAmount;
}

export const getOriginalAmount = ({products}: { products: CartProductTypes[] }) => {
    const originalAmount = products.reduce((total, product) => total + product.product.price, 0).toLocaleString("us");
    return originalAmount;
}

export const makeSecureUrl = (url: string) => {
    const splittedUrl = url.split(':');
    return `${splittedUrl[0]}s:${splittedUrl[1]}`;
}
