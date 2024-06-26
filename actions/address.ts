"use server";
import { z } from "zod";
import { findUserByIdDB } from "@/data/user";
import { UpdateAddressSchema } from "@/schemas";
import { addAddAddressDB, getAddressByUserIdDB, updateAddressByIdDB } from "@/data/address";

export const updateUserAddress = async (
  values: z.infer<typeof UpdateAddressSchema>,
  userId: string
) => {
  const validation = UpdateAddressSchema.safeParse(values) as any;

  if (!validation.success) {
    return { error: "Invalid Fields!" };
  }
  const validatedData = validation.data;

  try {
    const userExistOrNot = await findUserByIdDB(userId);

    if (!userExistOrNot) {
      return { error: "User Not Found!" };
    }

    const userAddress = await getAddressByUserIdDB(userId);
    if (!userAddress) {
      await addAddAddressDB(validatedData, userId);
      return { success: "Address Added Successfully!" };
    } else {
      await updateAddressByIdDB(userAddress.id, validatedData, userId);
      return { success: "Address Updated Successfully!" };
    }
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
