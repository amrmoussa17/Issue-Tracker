import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { issueSchema } from "@/app/ValidationSchema"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const result = issueSchema.safeParse(body)
  if (!result.success)
    return NextResponse.json(result.error.issues, { status: 400 })
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
      title: body.title,
      description: body.description,
    },
  })

  return NextResponse.json(updatedIssue, { status: 200 })
}
