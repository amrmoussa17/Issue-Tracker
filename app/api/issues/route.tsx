import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { issueSchema } from "@/app/ValidationSchema"
import { getServerSession } from "next-auth"
import authOptions from "@/app/auth/AuthOptions"

export async function POST(request: NextRequest) {
  const session = getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }
  const body = await request.json()
  const result = issueSchema.safeParse(body)
  if (!result.success)
    return NextResponse.json(result.error.issues, { status: 400 })

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  })
  return NextResponse.json(newIssue, { status: 201 })
}
