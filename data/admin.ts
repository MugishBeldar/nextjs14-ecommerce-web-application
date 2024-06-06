'use server';
import { db } from "@/lib/db";

export async function getAdminDetailsDB (id:string) {
  try {
    const response = await db.admin_user.findFirst(
      {
        where: {
          id
        },
      }
    )
    return response;
  } catch (error) {
    throw error;
  }
}