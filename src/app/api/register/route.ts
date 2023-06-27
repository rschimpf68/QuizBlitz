import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password } = body;
  const avatars = [
    "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Cleo",
    "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Shadow",
    "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Peanut",
    "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Bailey",
    "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Tigger",
    "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Casper",
    "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Dusty"
  ]
  var image = avatars[Math.floor(Math.random() * avatars.length)];

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  if (name.length > 10) {
    return new NextResponse("Username too long", { status: 400 });
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
    throw new Error("Name already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      image
    },
  });

  return NextResponse.json(user);
}
