"use server";

import { z } from "zod";

import { createCategoryDB, getCetgoryByNameDB, getAllCategoryDB, getAllCategorisWithProductCountDB, getCategoryByIdDB, updateCategoryDB, deleteCategoryDB } from "@/data/category";
import { CategorySchema } from "@/schemas";

export const createCategory = async (
  value: z.infer<typeof CategorySchema>,
) => {
  const validation = CategorySchema.safeParse(value);

  if (!validation.success) {
    return { error: "Invalid Fields!" };
  }
  const validatData = validation.data;
  try {
    const category = await getCetgoryByNameDB(validatData.categoryName);
    if (category) {
      return { error: "Category already exists!" };
    }
    await createCategoryDB(validatData);
    return { success: "Category successfully created" }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        error: "Failed to create category.",
      };
    }
  }
};

export const getCategories = async () => {
  try {
    const response = await getAllCategoryDB();
    return response;
  } catch (error) {
    console.log("Error while getting categories", error);
  }
};

export const getAllCategorisWithProductCount = async () => {
  const result = await getAllCategorisWithProductCountDB();
  return result;
};

export const updateCategory = async (categoryName: string, id: string) => {
  try {
    const category = await getCategoryByIdDB(id);
    if (!category) return { error: "category not found" };
    await updateCategoryDB(categoryName, id);
    return { success: "Category successfully updated" };
  } catch (err: unknown) {
    return {
      error: "Failed to update category",
    };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const category = await getCategoryByIdDB(id);
    if (!category) return { error: "category not found" };
    await deleteCategoryDB(id);
    return { success: "Category successfully deleted" };
  } catch (err: unknown) {
    return {
      error: "Failed to delete category",
    };
  }
} 