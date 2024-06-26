'use server';
import { db } from "@/lib/db";
import { Address } from "@prisma/client";

export const getAddressByUserIdDB = async (userId: string) => {
  try {
    const user = await db.address.findFirst({
      where: {
        userId,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in data-access/user.ts", error);
    return null;
  }
};

export const addAddAddressDB = async (address:Address, userId:string) => {
  address.userId = userId;
  try {
   const createdAddress = await db.address.create({
      data: address
    })
    if(createdAddress) {
      return createdAddress;
    }
  } catch (error) {
    console.error("Error in data-access/user.ts", error);
    return null;
  }
}

export const updateAddressByIdDB = async (id:string, address:Address, uesrId:string) => {
  address.userId = uesrId;
  try {
   const updatedAddress = await db.address.update({
      where: {
        id
      },
      data: address
    })
    if(updatedAddress) {
      return updatedAddress;
    }
  } catch (error) {
    console.error("Error in data-access/user.ts", error);
    return null;
  }
}
