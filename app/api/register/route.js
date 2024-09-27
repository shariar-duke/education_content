import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// now I will write the defination of post call
export const POST = async (request) => {
  const { firstName, lastName, email, password, userRole } =
    await request.json();

  console.log(firstName, lastName, email, password, userRole);

  await dbConnect();

  // hash te password

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    role: userRole,
  };

  console.log("The new user is ready", newUser);

  try {
    await User.create(newUser);
    return new NextResponse("User has been created successfully,", {
      status: 201,
    });
  } catch (error) {
    console.log("error while registration");
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
