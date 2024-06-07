"use server";

import { db } from "@/lib/db";

export const createCategoryDB = async (categoryData: {
  categoryName: string;
}) => {
  await db.categories.create({
    data: categoryData,
  });
};

export const getCetgoryByNameDB = async (categoryName: string) => {
  const response = await db.categories.findFirst({
    where: {
      categoryName,
    },
  });
  return response;
};

export const getAllCategoryDB = async () => {
  const response = await db.categories.findMany();
  return response;
};


export const getAllCategorisWithProductCountDB = async () => {
  const result = await db.categories.findMany({
    select: {
      id: true,
      categoryName: true,
      products: {
        select: {
          id: true,
        },
      },
    },
  });
  return result;
};

export const getCategoryByIdDB = async (id: string) => {
  return await db.categories.findFirst({
    where: {
      id,
    },
  });
};

export const updateCategoryDB = async (categoryName: string, id: string) => {
  await db.categories.update({
    where: {
      id,
    },
    data: {
      categoryName,
    },
  });
};

export const deleteCategoryDB = async (id: string) => {
  try {
    return await db.categories.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};