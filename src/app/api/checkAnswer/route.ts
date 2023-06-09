import { NextResponse } from 'next/server'
import client from "../../libs/prismadb";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

  const answerIsCorrect = await client.answer.findUnique({
    select: {
        correct: true,
    }, 
    where : {
        id: id as string
    }
  })
 
 
  return NextResponse.json(answerIsCorrect?.correct)
}