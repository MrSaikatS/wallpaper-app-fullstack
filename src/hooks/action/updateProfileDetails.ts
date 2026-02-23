"use server";

import { auth } from "@/lib/betterAuth/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const updateProfileDetails = async (name: string) => {
  try {
    await auth.api.updateUser({
      body: {
        name,
      },
      headers: await headers(),
    });

    revalidatePath("/", "layout");

    return {
      isSuccess: true,
      message: "Name updated ✌️",
    };
  } catch (error) {
    console.error("Update profile error:", error);

    return {
      isSuccess: false,
      message: "Name not updated 🥲",
    };
  }
};
export default updateProfileDetails;
