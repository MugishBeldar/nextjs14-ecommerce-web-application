"use server";
import { db } from "@/lib/db";

export const findUserByIdDB = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in data-access/user.ts", error);
    return null;
  }
};

export const getUserbyEmailDB = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
      include:{
        profile: true,
        wishlist:true,
      }
    });
    return user;
  } catch (error) {}
};

export const createUserdb = async (
  name: string,
  email: string,
  image: string
) => {
  try {
    const createdUser = await db.user.create({
      data: {
        name,
        email,
        image,
      },
    });
    return createdUser;
  } catch {}
};

export const updateUser = async (
  name: string,
  id: string,
  updateEmail:string,
  image: string,
) => {
  try {
    const updated = await db.user.update({
      where:{
        id
      },
      data: {
        name,
        email:updateEmail,
        image,
      },
    });
    return updated;
  } catch(error) {
    console.log('Failed to update', error);
    
  }
};

export const updateUserByEmailDB = async ({
  title,
  firstName,
  middleName,
  lastName,
  gender,
  email,
}:{
  title:string;
  firstName:string;
  middleName:string;
  lastName:string;
  gender:string;
  email:string;
}) => {
  try {
    await db.user.update({
      where: { email },
      data: {
        title,
        firstName,
        middleName,
        lastName,
        gender,
        email,
      },
    });
  } catch (error) {
    console.log("Error in data-access/user.ts", error);
    return null;
  }
}