"use server";

import { getUserbyEmailDB } from "@/data/user";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await getUserbyEmailDB(email);
    return user;
  } catch (error) {
    console.log("Error while getting user by email", error);
  }
};
