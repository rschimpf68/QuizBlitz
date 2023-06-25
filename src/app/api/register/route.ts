import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const existEmail = await prisma.user.findUnique({
    where: {
      email
    },
  });
  const existName = await prisma.user.findFirst({
    where: {
      name,
    },
  });
  
  if (existEmail) {
    throw new Error("Email already exists");
  }
  if (existName) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
