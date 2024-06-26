"use server";

import { z } from "zod";
import { UpdateProfileSchema } from "@/schemas";
import { getUserbyEmailDB, updateUserByEmailDB } from "@/data/user";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await getUserbyEmailDB(email);
    return user;
  } catch (error) {
    console.log("Error while getting user by email", error);
  }
};


export const updateUserDetails = async (
  values: z.infer<typeof UpdateProfileSchema>,
  email: string
) => {
  const validation = UpdateProfileSchema.safeParse(values) as any;

  if (!validation.success) {
    return { error: "Invalid Fields!" };
  }
  const { fName, mName, lName, gender, emailid, title } = validation.data;

  try {
    const userExistOrNot = await getUserbyEmailDB(email);

    if (!userExistOrNot) {
      return { error: "User Not Found!" };
    }

    const user = await updateUserByEmailDB({
      title,
      firstName: fName,
      middleName: mName,
      lastName: lName,
      gender: gender,
      email: emailid,
    });
    return {
      success: "update user successfully.",
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        error: "Failed to verify user.",
      };
    }
  }
};