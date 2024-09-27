"use server";

const { signIn } = require("@/auth");

export async function credentailLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
}
