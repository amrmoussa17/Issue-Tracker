import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { patchIssueSchema } from "@/app/ValidationSchema"
import authOptions from "@/app/auth/AuthOptions"
import { getServerSession } from "next-auth"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }
  const body = await request.json()
  const result = patchIssueSchema.safeParse(body)
  if (!result.success)
    return NextResponse.json(result.error.issues, { status: 400 })

  const { title, description, assignedToUserId } = body

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    })
    if (!user)
      return NextResponse.json({ error: "invalid user" }, { status: 400 })
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 400 })

  const updatedIssue = await prisma.issue.update({
    where: {
      id: params.id,
    },
    data: {
      title,
      description,
      assignedToUserId,
    },
  })

  return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 400 })

  await prisma.issue.delete({
    where: {
      id: params.id,
    },
  })
  return NextResponse.json({})
}
