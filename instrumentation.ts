'use server';
import { db } from "@/lib/db";

export async function register() {
  console.info('Instumentation called:---');
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const admin = await db.admin_user.count();
    if (!admin) {
      await db.admin_user.create({
        data: {
          firstName: "admin",
          lastName: "1",
          email: "admin@gmail.com",
          password: "Admin@123",
          status: true,
        },
      });
    }
  };
}